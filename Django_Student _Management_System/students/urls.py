from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('students/', views.student_list, name='student_list'),
    path('students/<int:pk>/', views.student_detail, name='student_detail'),
    path('courses/', views.course_list, name='course_list'),
    path('enrollments/', views.enrollment_list, name='enrollment_list'),
]