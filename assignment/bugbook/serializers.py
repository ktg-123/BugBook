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
    #apps=serializers.HyperlinkedRelatedField(many=True, view_name='app-detail', read_only=True)
    class Meta:
        model=User
        fields=['id', 'username', 'is_staff', 'is_active', 'is_superuser','email','first_name','last_name']

class AppSerializer(WritableNestedModelSerializer):
    #bugs=serializers.HyperlinkedRelatedField(many=True, view_name='bug-detail', read_only=True)
    team_members=UserDetailSerializer(many=True)
    creator=serializers.ReadOnlyField(source='creator.username')
    creator=UserDetailSerializer()
    class Meta:
        model=AppDetail
        fields=['id','app_name','creator','team_members','test_date','wiki']
        # depth=1
    
    # def create(self, validated_data):
    #     profile_data = validated_data.pop('team_members')
    #     user = AppDetail.objects.create(**validated_data)
    #     User.objects.create(user=user, **profile_data)
    #     return user    
    # def create(self, validated_data):
    #     choice_validated_data = validated_data.pop('team_members')
    #     question = AppDetail.objects.create(**validated_data)
    #     choice_set_serializer = self.fields['team_members']
    #     for each in choice_validated_data:
    #         each['question'] = question
    #     choices = choice_set_serializer.create(choice_validated_data)
    #     return question

class BugSerializer(WritableNestedModelSerializer):
    app_name=AppDetailSerializer() # Nested Serializer
    creator=serializers.ReadOnlyField(source='creator.username')
    class Meta:
        model=BugDetail
        fields=['id','creator','app_name','summary','status','bugtype','assigned_to','description','report_date']
        # depth=1
class CommentSerializer(WritableNestedModelSerializer):
    # bug=BugDetailSerializer() # Nested Serializer
    creator=serializers.ReadOnlyField(source='creator.username')
    class Meta:
        model=Comment
        fields=['id','bug','creator','description','comment_date']
        #depth=1

