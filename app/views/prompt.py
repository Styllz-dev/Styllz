from django.contrib.auth.models import AnonymousUser
from rest_framework import viewsets, mixins, permissions
from app.models import Prompt
from app.serializers import PromptSerializer

from django_q.tasks import async_task


class IsOwner(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):
        return obj.user == request.user


class PromptViewSet(mixins.RetrieveModelMixin, mixins.ListModelMixin, mixins.DestroyModelMixin, mixins.CreateModelMixin,
                    viewsets.GenericViewSet):
    serializer_class = PromptSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def perform_create(self, serializer):
        prompt = serializer.save(user=self.request.user)
        #async_task("app.core.pipeline.make_photo", prompt)

    def get_queryset(self, *args, **kwargs):
        if type(self.request.user) != AnonymousUser:
            return Prompt.objects.filter(user=self.request.user)
        return Prompt.objects.none()


__all__ = ['PromptViewSet']
