from rest_framework import serializers
from .models import Projects,Techincal_skills

class ProjectsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Projects
        fields = '__all__'
class SkillsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Techincal_skills
        fields = '__all__'