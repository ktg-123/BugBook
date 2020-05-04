from rest_framework import seraializers
from djnano.contrib.auth.models import User
from .models import AppDetail, BugDetail, Comment

class UserSerializer(serializers.HyperlinkedModelSerializer):
    apps=serializers.HyperlinkedRelatedField(many=True, view_name='app-detail', read_only=True)
    class Meta:
        model=User
        fields=['url','id', 'username', 'is_staff', 'is_active', 'is_superuser','apps']

class AppSerializer(serializers.HyperlinkedModelSerializer):
    bugs=serializers.HyperlinkedRelatedField(many=True, view_name='bug-detail', read_only=True)
    creator=serializers.ReadOnlyField(source='creator.username')
    class Meta:
        model=AppDetail
        fields=['url','app_name','creator','team_members','test_date','wiki','bugs']

class BugSerializer(serializers.HyperlinkedModelSerializer):
    creator=serializers.ReadOnlyField(source='creator.username')
    class Meta:
        model=BugDetail
        fields=['url','creator','app_name','summary','bug_status','bug_type','description']

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model=Comment
        fields=['bug','author','description','comment_date']
