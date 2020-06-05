from django.shortcuts import render
from .serializers import UserSerializer, AppSerializer, BugSerializer, CommentSerializer
from .models import AppDetail, BugDetail, Comment
from rest_framework.decorators import api_view, action
from rest_framework import viewsets, permissions , status
from rest_framework.reverse import reverse
from django.contrib.auth.models import User
from django.contrib.auth import login, logout
from rest_framework.response import Response
from .permissions import IsOwnerOrReadOnly, ReadOnly, IsTeamOrReadOnly
import json, requests
from django.http import HttpResponse, JsonResponse
from django.shortcuts import redirect
# Create your views here.
# @api_view(['GET'])
# def api_root(request, format=None):
#     return Response({
#         'users': reverse('user-list', request=request, format=format),
#         'apps':reverse('app-list', request=request, format=format)
#         'bugs':reverse('bug-list', request=request, format=format)
#         'comments':reverse('comment-list', request=request, format=format)
#     })

class UserViewSet(viewsets.ModelViewSet):
    queryset=User.objects.all()
    serializer_class=UserSerializer
    # permission_classes=[permissions.IsAdminUser|ReadOnly]
    @action(methods=['post', 'options','get'], detail=False, url_name="onlogin", url_path="onlogin",permission_classes=[permissions.AllowAny,])
    def on_login(self,request):
        code=self.request.data
        # code=self.request.query_params.get('code')
        #return HttpResponse(str(code))
        
        url='https://internet.channeli.in/open_auth/token/'
        parameters={
            'client_id':'fgBgJtpe1JtrRU36zyzstoBedUog7ae62BCjieZS',
            'client_secret':'JTF7T932HGebemZAbncwAxeQPVfuf8bVUfeRz8sSe4tRiVEl87x02goOdjukWGOw0c0HGD6ftoVUXydqRXcLXUWd7Q0la4J5kYUFUojEyCpeTvVHrvnXT5wREKmogE76',
            'grant_type':'authorization_code',
            'redirect_url':'http://127.0.0.1:3000/atlogin',
            'code': code['code'],
            # 'code': code
        }
        user_data=requests.post(url=url, data=parameters).json()
        #return HttpResponse(str(user_data))
        access_token=user_data['access_token']
        headers={
            'Authorization' : 'Bearer '+access_token,
    
        }
        user_data=requests.get(url="https://internet.channeli.in/open_auth/get_user_data/", headers=headers).json()
        try:
            exist_user=User.objects.get(email = user_data["contactInformation"]["instituteWebmailAddress"])
        except User.DoesNotExist:
                img=False
                is_admin=False
                for role in user_data["person"]["roles"]:
                    if role["role"]=="Maintainer":
                        img=True
                        break
                if (img):
                    email = user_data["contactInformation"]["instituteWebmailAddress"]
                    name = (user_data["person"]["fullName"]).split()
                    firstName = name[0]
                    lastName = name[1]
                    username=name[0]
                    is_staff=True
                    is_active=True
                    if user_data["student"]["currentYear"] >= 3:
                        is_admin = True
                    
                    newuser=User(email=email,last_name=lastName,username=username,is_superuser=is_admin, first_name=firstName, is_staff=is_staff, is_active=is_active)
                    newuser.save()
                    login(request=request, user=newuser)
                    return Response({"status": "user created", "access_token": access_token}, status=status.HTTP_202_ACCEPTED)
                else:
                    return Response({"status": "not in IMG"}, status=status.HTTP_401_UNAUTHORIZED)
        # except User.DoesNotExist:
        #     pass
        #login(request=request, user=user)
        # ur='http://localhost:3000/?id=2'
        # return redirect(ur)
        login(request=request, user=exist_user)
        #request.session.modified=True
        # return HttpResponse(str(request.session))
        return Response({"status": "user exists", "access_token": access_token})
    
    
    @action(methods=['post', 'options','get'], detail=False, url_name="reqlogin", url_path="reqlogin")
    def req_login(self, request):
        id=request.user
        user=UserSerializer(id)
        return Response(user.data)
    
    
    
    @action(methods=['post', 'options','get'],detail=False, url_name="onlogout", url_path="onlogout")
    def on_logout(self,request):

        logout(request=request)
        return redirect('http://127.0.0.1:3000/')

class AppViewSet(viewsets.ModelViewSet):
    queryset=AppDetail.objects.all()
    serializer_class=AppSerializer
    permission_classes=[permissions.IsAuthenticatedOrReadOnly, IsTeamOrReadOnly|IsOwnerOrReadOnly|permissions.IsAdminUser]
    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)
    
    @action(methods=['post', 'options','get'], detail=False, url_name="getapps", url_path="getapps")
    def get_apps(self, request):    
        created_apps=AppDetail.objects.filter(creator=request.user)
        serialize=AppSerializer(created_apps, many=True)
        return Response(serialize.data)


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

