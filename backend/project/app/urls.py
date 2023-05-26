from django.urls import path,include
from . import views
from rest_framework import routers
from .views import ProjectsViewSet,FeedbackViewSet
from rest_framework_simplejwt import views as jwt_views

router = routers.DefaultRouter()
router.register(r'projects', ProjectsViewSet,'projects')
router.register(r'feedback', FeedbackViewSet,'feedback')
urlpatterns = [
    path('', include(router.urls)),
    path('token/', jwt_views.TokenObtainPairView.as_view(), name='token_access'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]