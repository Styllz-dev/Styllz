# Generated by Django 4.2 on 2023-06-22 15:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_remove_prompt_image_style_icon_delete_clothesprompt'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='prompt',
            name='type',
        ),
        migrations.AddField(
            model_name='prompt',
            name='style',
            field=models.CharField(blank=True, max_length=50, verbose_name='Стиль'),
        ),
        migrations.DeleteModel(
            name='Style',
        ),
    ]