# Generated by Django 3.1.6 on 2021-12-28 23:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('article', '0003_article_category'),
    ]

    operations = [
        migrations.CreateModel(
            name='Likes',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('users_id', models.TextField(default='')),
                ('article', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='likes', to='article.article')),
            ],
        ),
    ]
