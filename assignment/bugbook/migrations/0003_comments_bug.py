# Generated by Django 3.0.5 on 2020-05-01 04:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('bugbook', '0002_comments'),
    ]

    operations = [
        migrations.AddField(
            model_name='comments',
            name='bug',
            field=models.ForeignKey(blank=True, default='', on_delete=django.db.models.deletion.CASCADE, to='bugbook.BugDetails'),
        ),
    ]