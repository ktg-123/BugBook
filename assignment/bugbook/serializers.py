from rest_framework import serializers
from django.contrib.auth.models import User
from .models import AppDetail, BugDetail, Comment
from drf_writable_nested.serializers import WritableNestedModelSerializer



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
        extra_kwargs = {
            'username': {'validators': []},
        }

        
class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model=User
        fields=['id', 'username', 'is_staff', 'is_active', 'is_superuser','email','first_name','last_name']

class AppSerializer(WritableNestedModelSerializer):
    
    team_members=UserDetailSerializer(many=True)
    creator=serializers.ReadOnlyField(source='creator.username')
    
    class Meta:
        model=AppDetail
        fields=['id','app_name','creator','team_members','test_date','wiki']
        # depth=1
    
    
class BugSerializer(WritableNestedModelSerializer):
    app_name=AppDetailSerializer() # Nested Serializer
    creator=serializers.ReadOnlyField(source='creator.username')
    class Meta:
        model=BugDetail
        fields=['id','creator','app_name','summary','status','bugtype','assigned_to','description','report_date']
    
class CommentSerializer(WritableNestedModelSerializer):
    
    creator=serializers.ReadOnlyField(source='creator.username')
    class Meta:
        model=Comment
        fields=['id','bug','creator','description','comment_date']
    

