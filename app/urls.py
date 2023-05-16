"""
URL configuration for Styllz project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import include, path
from app.router import HybridRouter
from knox import views as knox_views
from app.views import StyleViewSet, ClothingViewSet, PromptViewSet, RegisterAPI, LoginAPI, ProfileApi

router = HybridRouter()
router.register(r'styles', StyleViewSet)
router.register(r'clothes', ClothingViewSet)
router.register(r'prompts', PromptViewSet, basename="Prompt")

router.add_api_view("profile", ProfileApi.as_view())
router.add_api_view("register", RegisterAPI.as_view())
router.add_api_view("login", LoginAPI.as_view())
router.add_api_view("logout", knox_views.LogoutView.as_view())

urlpatterns = [
    path('', include(router.urls)),
    path('login/', LoginAPI.as_view(), name='login'),
    path('logout/', knox_views.LogoutView.as_view(), name='logout'),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
