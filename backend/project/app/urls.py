from django.urls import path,include
from . import views
from rest_framework import routers
from .views import ProjectsViewSet

router = routers.DefaultRouter()
router.register(r'projects', ProjectsViewSet,'projects')
urlpatterns = [
    path('', include(router.urls)),

]