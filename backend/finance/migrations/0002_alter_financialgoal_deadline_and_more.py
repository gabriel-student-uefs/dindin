# Generated by Django 4.2.3 on 2024-12-01 22:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('finance', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='financialgoal',
            name='deadline',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='financialgoal',
            name='frequency',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
