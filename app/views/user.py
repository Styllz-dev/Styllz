from rest_framework import generics, permissions, views
from rest_framework.response import Response
from knox.models import AuthToken
from app.serializers import UserSerializer, RegisterSerializer
from django.contrib.auth import login
from django.contrib.auth.models import AnonymousUser
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.views import LoginView as KnoxLoginView


class ProfileApi(views.APIView):
    def get(self, request, *args, **kwargs):
        user = request.user
        if type(user) == AnonymousUser:
            data = {}
        else:
            data = UserSerializer(user).data

        return Response(data)


class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        login(request, user)
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


class LoginAPI(KnoxLoginView):
    serializer_class = AuthTokenSerializer
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return super(LoginAPI, self).post(request, format=format)


__all__ = ['ProfileApi', 'RegisterAPI', 'LoginAPI']
