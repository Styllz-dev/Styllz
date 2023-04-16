from rest_framework import viewsets, mixins
from app.models import Style, Clothing
from app.serializers import StyleSerializer, ClothingSerializer


class GetObjectViewSet(mixins.RetrieveModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet):
    pass


class StyleViewSet(GetObjectViewSet):
    queryset = Style.objects.all()
    serializer_class = StyleSerializer


class ClothingViewSet(GetObjectViewSet):
    queryset = Clothing.objects.all()
    serializer_class = ClothingSerializer


__all__ = ["StyleViewSet", "ClothingViewSet"]
