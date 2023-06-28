from colorfield.fields import ColorField
from django.db import models


class Clothing(models.Model):
    class Meta:
        verbose_name = "Одежда"
        verbose_name_plural = "Одежда"

    name = models.CharField(max_length=50, verbose_name="Название")
    icon = models.ImageField(blank=True, null=True, upload_to="clothes", verbose_name="Иконка")

    def __str__(self):
        return self.name


class Prompt(models.Model):
    class Meta:
        verbose_name = "Запрос"
        verbose_name_plural = "Запросы"

    user = models.ForeignKey("auth.User", on_delete=models.CASCADE, verbose_name="Пользователь")
    style = models.CharField(max_length=50, blank=True, verbose_name="Стиль")
    details = models.CharField(max_length=150, blank=True, verbose_name="Комментарий")
    error = models.TextField(blank=True, editable=False, verbose_name="Ошибка")

    def __str__(self):
        return f"{self.id} - {self.style}"


class Result(models.Model):
    class Meta:
        verbose_name = "Результат"
        verbose_name_plural = "Результаты"

    prompt = models.ForeignKey(Prompt, on_delete=models.CASCADE, related_name="results", verbose_name="Запрос")
    image = models.ImageField(upload_to="results", verbose_name="Изображение")

    def __str__(self):
        return self.image.url
