from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from rest_framework.urlpatterns import format_suffix_patterns
#from .views  import api_root

router=DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'apps', views.AppViewSet)
router.register(r'bugs', views.BugViewSet)
router.register(r'comments', views.CommentViewSet)

urlpatterns=[
    path('',include(router.urls)),
]