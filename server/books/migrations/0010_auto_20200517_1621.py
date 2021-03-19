# Generated by Django 3.0.3 on 2020-05-17 16:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0009_remove_comment_mark'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='book',
            options={'ordering': ['-created_at'], 'verbose_name': 'Book', 'verbose_name_plural': 'Books'},
        ),
        migrations.AlterModelOptions(
            name='comment',
            options={'ordering': ['-created_at'], 'verbose_name': 'Book comment', 'verbose_name_plural': 'Book comments'},
        ),
    ]