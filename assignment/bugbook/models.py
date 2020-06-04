from django.db import models
from ckeditor.fields import RichTextField
from django.contrib.auth.models import User
from ckeditor_uploader.fields import RichTextUploadingField
# Create your models here.

class AppDetail(models.Model):
    app_name=models.CharField(max_length=250)
    creator=models.ForeignKey(User,related_name='app', on_delete=models.CASCADE)
    team_members=models.ManyToManyField(User)
    test_date=models.DateTimeField(auto_now_add=True)
    #icon=models.ImageField('')
    wiki=RichTextUploadingField()
    def __str__(self):
        return "%s by %s" % (self.app_name ,self.creator)

class BugDetail(models.Model):
    creator=models.ForeignKey(User,related_name='bug', on_delete=models.CASCADE)
    app_name=models.ForeignKey(AppDetail,on_delete=models.CASCADE)
    summary=models.CharField(max_length=250)
    bug_status=(
        ('r','Resolved'),
        ('w','Working'),
        ('ns','Not Seen'),
    )
    status=models.CharField(
        max_length=2,
        choices=bug_status,
        default=bug_status[2][1],
        blank=True,
        #null=True,
    )
    bug_type=(
        ('d','defect'),
        ('e','enhancement'),
    )
    bugtype=models.CharField(
        max_length=1,
        choices=bug_type,
    )
    description=RichTextUploadingField()
    report_date=models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return "%s by %s" % (self.summary ,self.creator)

class Comment(models.Model):
    bug=models.ForeignKey(BugDetail,on_delete=models.CASCADE,blank=True,default='')
    creator=models.ForeignKey(User,related_name='comment', on_delete=models.CASCADE)
    description=RichTextUploadingField()
    comment_date=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "%s On %s " % (self.creator ,self.comment_date)