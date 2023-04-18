from django.db import models


class Style(models.Model):
    class Meta:
        verbose_name = "Стиль"
        verbose_name_plural = "Стиль"

    alias = models.CharField(max_length=50, verbose_name="Наименование")
    name = models.CharField(max_length=50, verbose_name="Название")

    def __str__(self):
        return self.alias


class Clothing(models.Model):
    class Meta:
        verbose_name = "Одежда"
        verbose_name_plural = "Одежда"

    alias = models.CharField(max_length=50, verbose_name="Наименование")
    name = models.CharField(max_length=50, verbose_name="Название")
    icon = models.ImageField(blank=True, null=True, verbose_name="Иконка")

    def __str__(self):
        return self.alias


class Prompt(models.Model):
    class Meta:
        verbose_name = "Запрос"
        verbose_name_plural = "Запросы"

    user = models.ForeignKey("auth.User", on_delete=models.CASCADE, verbose_name="Пользователь")
    type = models.ForeignKey(Style, on_delete=models.CASCADE, verbose_name="Тип")
    clothes = models.ManyToManyField(Clothing, blank=True, verbose_name="Одежда")
    colorscheme = models.CharField(max_length=50, blank=True, verbose_name="Цветовая гамма")
    details = models.CharField(max_length=150, blank=True, verbose_name="Комментарий")

    def __str__(self):
        return f"{self.id} - {self.type}"


class Result(models.Model):
    class Meta:
        verbose_name = "Результат"
        verbose_name_plural = "Результаты"

    prompt = models.ForeignKey(Prompt, on_delete=models.CASCADE, related_name="results", verbose_name="Запрос")
    image = models.ImageField(verbose_name="Изображение")