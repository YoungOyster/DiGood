# Generated by Django 3.2.17 on 2023-03-27 04:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0002_auto_20221223_1536'),
    ]

    operations = [
        migrations.AddField(
            model_name='coordinates',
            name='click_Height',
            field=models.FloatField(null=True, verbose_name='クリック時のHeight'),
        ),
        migrations.AddField(
            model_name='coordinates',
            name='click_Width',
            field=models.FloatField(null=True, verbose_name='クリック時のWidth'),
        ),
    ]
