from django.contrib.auth.models import User
from rest_framework import viewsets, mixins, permissions
from app.serializers import UserSerializer


class IsUser(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):
        return obj == request.user


class UserViewSet(mixins.ListModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin,
                  mixins.CreateModelMixin, viewsets.GenericViewSet):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsUser]

    def get_permissions(self):
        if self.action == 'list':
            self.permission_classes = [IsUser]
        return super(self.__class__, self).get_permissions()

    def get_queryset(self, *args, **kwargs):
        if self.request.user:
            return User.objects.filter(id=self.request.user.id)
