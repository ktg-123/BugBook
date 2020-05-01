# Generated by Django 3.0.5 on 2020-05-01 04:09

import ckeditor.fields
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
            name='AppDetails',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('app_name', models.CharField(max_length=250)),
                ('test_date', models.DateTimeField(auto_now_add=True)),
                ('wiki', ckeditor.fields.RichTextField()),
                ('creator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='app', to=settings.AUTH_USER_MODEL)),
                ('team_members', models.ManyToManyField(to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='BugDetails',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('summary', models.CharField(max_length=250)),
                ('status', models.CharField(blank=True, choices=[('r', 'Resolved'), ('w', 'Working'), ('ns', 'Not Seen')], default='ns', max_length=2)),
                ('bugtype', models.CharField(choices=[('d', 'defect'), ('e', 'enhancement')], max_length=1)),
                ('description', ckeditor.fields.RichTextField()),
                ('report_date', models.DateTimeField(auto_now_add=True)),
                ('app_name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bugbook.AppDetails')),
                ('creator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='bug', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
