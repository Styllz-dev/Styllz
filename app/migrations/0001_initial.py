# Generated by Django 4.2 on 2023-05-17 13:28

import colorfield.fields
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Clothing',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, verbose_name='Название')),
                ('icon', models.ImageField(blank=True, null=True, upload_to='clothes', verbose_name='Иконка')),
            ],
            options={
                'verbose_name': 'Одежда',
                'verbose_name_plural': 'Одежда',
            },
        ),
        migrations.CreateModel(
            name='Prompt',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='prompts', verbose_name='Картинка')),
                ('details', models.CharField(blank=True, max_length=150, verbose_name='Комментарий')),
                ('error', models.TextField(blank=True, editable=False, verbose_name='Ошибка')),
            ],
            options={
                'verbose_name': 'Запрос',
                'verbose_name_plural': 'Запросы',
            },
        ),
        migrations.CreateModel(
            name='Style',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, verbose_name='Название')),
            ],
            options={
                'verbose_name': 'Стиль',
                'verbose_name_plural': 'Стиль',
            },
        ),
        migrations.CreateModel(
            name='Result',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='results', verbose_name='Изображение')),
                ('prompt', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='results', to='app.prompt', verbose_name='Запрос')),
            ],
            options={
                'verbose_name': 'Результат',
                'verbose_name_plural': 'Результаты',
            },
        ),
        migrations.AddField(
            model_name='prompt',
            name='type',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.style', verbose_name='Тип'),
        ),
        migrations.AddField(
            model_name='prompt',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Пользователь'),
        ),
        migrations.CreateModel(
            name='ClothesPrompt',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('color', colorfield.fields.ColorField(default='#FFFFFF', image_field=None, max_length=18, samples=None, verbose_name='Цвет')),
                ('clothing', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.clothing', verbose_name='Одежда')),
                ('prompt', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='clothes', to='app.prompt', verbose_name='Запрос')),
            ],
            options={
                'verbose_name': 'Запрос одежды',
                'verbose_name_plural': 'Запросы одежды',
            },
        ),
    ]
