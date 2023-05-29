from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import action
from .models import Techincal_skills,Projects,Feedback,Certificates
from rest_framework import viewsets
from .serializers import ProjectsSerializer,SkillsSerializer,FeedbackSerializer,CertificatesSerializer
from rest_framework.response import Response
from django.contrib.auth import authenticate, login
from django.middleware.csrf import get_token
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

class FeedbackViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    def get_serializer(self, *args, **kwargs):
        if isinstance(kwargs.get("data", {}), list):
            kwargs["many"] = True
        return super(FeedbackViewSet, self).get_serializer(*args, **kwargs)

    def get_queryset(self):
        return Feedback.objects.all()

    @action(detail=False,methods=['post'])
    def addfeedback(self,request):
        response = {"status": "success", "error": None}
        try:
            # Data to be added
            data = {
                'name': self.request.data["name"],
                'text': self.request.data["text"],
                'image': self.request.data["image"],
                # Add more fields as needed
            }
            
            # Create a new instance of the model
            new_instance = Feedback(**data)
            new_instance.save()
            
            # Success message or further processing
            print("Data added successfully!")
            
        except Exception as e:
            response = {"status": "failed", "error":str(e)}
            # Error handling
            print(f"An error occurred while adding data: {str(e)}")
        return Response(response)

class CertificatesViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Certificates.objects.all()
    serializer_class = CertificatesSerializer
    def get_serializer(self, *args, **kwargs):
        if isinstance(kwargs.get("data", {}), list):
            kwargs["many"] = True
        return super(CertificatesViewSet, self).get_serializer(*args, **kwargs)

    def get_queryset(self):
        return Certificates.objects.all()

    @action(detail=False,methods=['post'])
    def addcertificates(self,request):
        response = {"status": "success", "error": None}
        try:
            # Data to be added
            data = {
                'name': self.request.data["name"],
                'image': self.request.data["image"],
                # Add more fields as needed
            }
            
            # Create a new instance of the model
            new_instance = Certificates(**data)
            new_instance.save()
            
            # Success message or further processing
            print("Data added successfully!")
            
        except Exception as e:
            response = {"status": "failed", "error":str(e)}
            # Error handling
            print(f"An error occurred while adding data: {str(e)}")
        return Response(response)