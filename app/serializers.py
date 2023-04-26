from app.models import Style, Clothing, Prompt
from rest_framework import serializers


class StyleSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Style
        fields = ['id', 'alias', 'name']


class ClothingSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Clothing
        fields = ['id', 'alias', 'name', 'icon']


class PromptSerializer(serializers.HyperlinkedModelSerializer):
    type = serializers.PrimaryKeyRelatedField(queryset=Style.objects.all())
    clothes = serializers.PrimaryKeyRelatedField(queryset=Clothing.objects.all(), many=True)

    class Meta:
        model = Prompt
        fields = ['id', 'type', 'image', 'clothes', 'colorscheme', 'details', 'results']
        read_only_fields = ['results']


