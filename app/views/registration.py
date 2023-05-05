from django.contrib.auth.models import User
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views import View

class RegistrationView(LoginRequiredMixin, View):
    login_url = '/login/'
    redirect_field_name = 'redirect_to'

    def login_user(self, email, password, first_name, last_name):
        user = User.objects.create_user('myemail@crazymail.com', 'mypassword')

        user.first_name = first_name
        user.last_name = last_name
        user.save()
