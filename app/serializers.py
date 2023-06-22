from django.contrib.auth.models import User
from app.models import Style, Clothing, Prompt
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


class PromptSerializer(serializers.HyperlinkedModelSerializer):
    type = serializers.PrimaryKeyRelatedField(queryset=Style.objects.all())
    results = serializers.SerializerMethodField()

    class Meta:
        model = Prompt
        fields = ['id', 'type', 'details', 'results', 'error']
        read_only_fields = ['results']

    def create(self, validated_data):
        return Prompt.objects.create(**validated_data)

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

    def validate_password(self, value):
        try:
            validators.validate_password(value)
        except exceptions.ValidationError as exc:
            raise serializers.ValidationError(list(exc.messages))
        return value
