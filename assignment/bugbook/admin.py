from django.contrib import admin
from .models import BugDetail,AppDetail,Comment

# Register your models here.
admin.site.register(BugDetail)
admin.site.register(AppDetail)
admin.site.register(Comment)