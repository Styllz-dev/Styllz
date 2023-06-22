from rest_framework import viewsets, mixins
from app.models import Clothing
from app.serializers import ClothingSerializer


class GetObjectViewSet(mixins.RetrieveModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet):
    pass


class ClothingViewSet(GetObjectViewSet):
    queryset = Clothing.objects.all()
    serializer_class = ClothingSerializer


__all__ = ["ClothingViewSet"]
