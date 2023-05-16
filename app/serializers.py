from django.contrib.auth.models import User
from app.models import Style, Clothing, Prompt, ClothesPrompt
from rest_framework import serializers
from django.core import exceptions
import django.contrib.auth.password_validation as validators


class StyleSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Style
        fields = ['id', 'name']


class ClothingSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Clothing
        fields = ['id', 'name', 'icon']


class ClothesPromptSerializer(serializers.HyperlinkedModelSerializer):
    clothing = serializers.PrimaryKeyRelatedField(queryset=Clothing.objects.all(), many=True)

    class Meta:
        model = ClothesPrompt
        fields = ['clothing', 'color']


class PromptSerializer(serializers.HyperlinkedModelSerializer):
    type = serializers.PrimaryKeyRelatedField(queryset=Style.objects.all())
    clothes = ClothesPromptSerializer(many=True)
    results = serializers.SerializerMethodField()

    class Meta:
        model = Prompt
        fields = ['id', 'type', 'image', 'clothes', 'details', 'results', 'error']
        read_only_fields = ['results']

    def create(self, validated_data):
        clothes = validated_data.pop('clothes')
        instance = Prompt.objects.create(**validated_data)
        for element in clothes:
            ClothesPrompt.objects.get_or_create(prompt=instance, **element)
        return instance

    def get_results(self, prompt: Prompt):
        return [self.context.get('request').build_absolute_uri(result.image.url) for result in prompt.results.all()]


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])
        return user

    def validate(self, data):
        user = User(**data)

        password = data.get('password')

        errors = dict()
        try:
            validators.validate_password(password=password, user=user)
        except exceptions.ValidationError as e:
            errors['password'] = list(e.messages)

        if errors:
            raise serializers.ValidationError(errors)

        return super(RegisterSerializer, self).validate(data)
