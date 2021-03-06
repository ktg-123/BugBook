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
from django.core.mail import EmailMessage


class UserViewSet(viewsets.ModelViewSet):
    queryset=User.objects.all()
    serializer_class=UserSerializer
    # permission_classes=[permissions.IsAdminUser|ReadOnly]
    @action(methods=['post', 'options','get'], detail=False, url_name="onlogin", url_path="onlogin",permission_classes=[permissions.AllowAny,])
    def on_login(self,request):
        code=self.request.data
    
        
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
    
        login(request=request, user=exist_user)
        
        return Response({"status": "user exists", "access_token": access_token})
    
    
    @action(methods=['post', 'options','get'], detail=False, url_name="reqlogin", url_path="reqlogin")
    def req_login(self, request):
        id=request.user
        user=UserSerializer(id)
        return Response(user.data)
    
    @action(methods=['post', 'options','get'],detail=False, url_name="afterlogin", url_path="afterlogin")
    def after_login(self,request):

        
        return redirect('http://127.0.0.1:3000/home')
    
    @action(methods=['post', 'options','get'], detail=False, url_name="getid", url_path="getid")
    def get_id(self, request):
        info=self.request.query_params.get('creator')
        user=User.objects.get(username=info)
        return Response(user.id)
    
    @action(methods=['post', 'options','get'],detail=False, url_name="onlogout", url_path="onlogout")
    def on_logout(self,request):

        logout(request=request)
        return redirect('http://127.0.0.1:3000/')

def send_email(response):
    
    
    recievers = []
    for user in User.objects.all():
        recievers.append(user.email)
    email = EmailMessage(
        'IMG Testing Notification',
        ('Hey All Now a new Testing app is availabel........ Pls Test and report as many bugs as possible in  '+ response['app_name']),
        'khandelwal.kunal12@gmail.com',
        recievers
    )

    email.send()

def send_email2(response):

    id=response['id']
    App=AppDetail.objects.get(id=id)
    creator = App.creator
    user=User.objects.get(username=creator)
    app_name=response['app_name']
    email = EmailMessage(
        'IMG Testing Notification',
        ('A bug has been reported in your app   '+app_name ),
        'khandelwal.kunal12@gmail.com',
        [user.email]
    )

    email.send()

class AppViewSet(viewsets.ModelViewSet):
    queryset=AppDetail.objects.all()
    serializer_class=AppSerializer
    permission_classes=[permissions.IsAuthenticatedOrReadOnly, IsTeamOrReadOnly|IsOwnerOrReadOnly|permissions.IsAdminUser]
    
    
    def create(self,request, *args, **kwargs):
        response = super(AppViewSet, self).create(request, *args, **kwargs)
        if response:
           
           print(response.data)
           send_email(response.data)  # sending mail
        # return res
        return response

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
    permission_classes=[permissions.IsAuthenticatedOrReadOnly]
    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)
    def create(self, request, *args, **kwargs):
        response = super(BugViewSet, self).create(request, *args, **kwargs)
        print((response.data)['app_name']['id'])
        send_email2((response.data)['app_name'])  # sending mail
        return response
class CommentViewSet(viewsets.ModelViewSet):
    queryset=Comment.objects.all()
    serializer_class=CommentSerializer
    permission_classes=[permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)

    