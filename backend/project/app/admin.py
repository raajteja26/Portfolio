from django.contrib import admin
from app.models import Techincal_skills,Projects,Feedback,Certificates,Experience
# Register your models here.

class Skills_admin(admin.ModelAdmin):
    list_display = ["languages", "o_s", "database"]
class Projects_admin(admin.ModelAdmin):
    list_display = ["name", "role"]
class Feedback_admin(admin.ModelAdmin):
    list_display = ["name"]
class Certificates_admin(admin.ModelAdmin):
    list_display = ["name"]
class Experience_admin(admin.ModelAdmin):
    list_display = ["years"]
admin.site.register(Techincal_skills,Skills_admin)
admin.site.register(Projects,Projects_admin)
admin.site.register(Feedback,Feedback_admin)
admin.site.register(Certificates,Certificates_admin)
admin.site.register(Experience,Experience_admin)