from django.shortcuts import render
from .serializers import UserSerializer, AppSerializer, BugSerializer, CommentSerializer
from .models import AppDetail, BugDetail, Comment
from rest_framework.decorators import api_view
from rest_framework import viewsets, permissions
from rest_framework.reverse import reverse
from django.contrib.auth.models import User
from .permissions import IsOwnerOrReadOnly

# Create your views here.
# @api_view(['GET'])
# def api_root(request, format=None):
#     return Response({
#         'users': reverse('user-list', request=request, format=format),
#         'apps':reverse('app-list', request=request, format=format)
#         'bugs':reverse('bug-list', request=request, format=format)
#         'comments':reverse('comment-list', request=request, format=format)
#     })

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset=User.objects.all()
    serializer_class=UserSerializer

class AppViewSet(viewsets.ModelViewSet):
    queryset=AppDetail.objects.all()
    serializer_class=AppSerializer
    permission_classes=[permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)

class BugViewSet(viewsets.ModelViewSet):
    queryset=BugDetail.objects.all()
    serializer_class=BugSerializer
    permission_classes=[permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)

class CommentViewSet(viewsets.ModelViewSet):
    queryset=Comment.objects.all()
    serializer_class=CommentSerializer
    permission_classes=[permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)
