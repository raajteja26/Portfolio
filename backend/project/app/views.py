from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import action
from .models import Techincal_skills,Projects
from rest_framework import viewsets
from .serializers import ProjectsSerializer,SkillsSerializer
from rest_framework.response import Response
# Create your views here.

class ProjectsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Projects.objects.all()
    serializer_class = ProjectsSerializer
    def get_serializer(self, *args, **kwargs):
        if isinstance(kwargs.get("data", {}), list):
            kwargs["many"] = True
        return super(ProjectsViewSet, self).get_serializer(*args, **kwargs)

    def get_queryset(self):
        return Projects.objects.all()

    @action(detail=False,methods=['post'])
    def addproject(self,request):
        response = {"status": "success", "error": None}
        try:
            # Data to be added
            data = {
                'name': self.request.data["name"],
                'role': self.request.data["role"],
                'technologies': self.request.data["technologies"],
                'responsibilities': self.request.data["responsibilities"],
                # Add more fields as needed
            }
            
            # Create a new instance of the model
            new_instance = Projects(**data)
            new_instance.save()
            
            # Success message or further processing
            print("Data added successfully!")
            
        except Exception as e:
            response = {"status": "failed", "error":str(e)}
            # Error handling
            print(f"An error occurred while adding data: {str(e)}")
        return Response(response)