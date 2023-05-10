from django.contrib.auth.models import User
from app.models import Style, Clothing, Prompt
from rest_framework import serializers


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
    clothes = serializers.PrimaryKeyRelatedField(queryset=Clothing.objects.all(), many=True)
    results = serializers.SerializerMethodField()

    class Meta:
        model = Prompt
        fields = ['id', 'type', 'image', 'clothes', 'colorscheme', 'details', 'results', 'error']
        read_only_fields = ['results']

    def get_results(self, prompt: Prompt):
        return [self.context.get('request').build_absolute_uri(result.image.url) for result in prompt.results.all()]


class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'last_name', 'first_name', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
        )

        return user
