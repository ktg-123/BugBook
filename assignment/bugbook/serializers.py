from rest_framework import serializers
from django.contrib.auth.models import User
from .models import AppDetail, BugDetail, Comment

class AppDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model=AppDetail
        fields=('id','app_name')
class BugDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model=BugDetail
        fields=('id','summary')
class UserDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model=User
        fields=('id','username')

class UserSerializer(serializers.ModelSerializer):
    #apps=serializers.HyperlinkedRelatedField(many=True, view_name='app-detail', read_only=True)
    class Meta:
        model=User
        fields=['id', 'username', 'is_staff', 'is_active', 'is_superuser','email','first_name','last_name']

class AppSerializer(serializers.ModelSerializer):
    #bugs=serializers.HyperlinkedRelatedField(many=True, view_name='bug-detail', read_only=True)
    team_members=UserDetailSerializer(many=True)
    creator=serializers.ReadOnlyField(source='creator.username')
    class Meta:
        model=AppDetail
        fields=['id','app_name','creator','team_members','test_date','wiki']
        #depth=1

class BugSerializer(serializers.ModelSerializer):
    app_name=AppDetailSerializer() # Nested Serializer
    creator=serializers.ReadOnlyField(source='creator.username')
    class Meta:
        model=BugDetail
        fields=['id','creator','app_name','summary','status','bugtype','description','report_date']
        #depth=1
class CommentSerializer(serializers.ModelSerializer):
    bug=BugDetailSerializer() # Nested Serializer
    creator=serializers.ReadOnlyField(source='creator.username')
    class Meta:
        model=Comment
        fields=['id','bug','creator','description','comment_date']
        #depth=1

