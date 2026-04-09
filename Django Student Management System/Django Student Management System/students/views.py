from django.shortcuts import render, get_object_or_404
from .models import Student, Course, Enrollment

def home(request):
    return render(request, 'students/home.html')

def student_list(request):
    students = Student.objects.all()
    return render(request, 'students/student_list.html', {'students': students})

def course_list(request):
    courses = Course.objects.all()
    return render(request, 'students/course_list.html', {'courses': courses})

def enrollment_list(request):
    enrollments = Enrollment.objects.all()
    return render(request, 'students/enrollment_list.html', {'enrollments': enrollments})

def student_detail(request, pk):
    student = get_object_or_404(Student, pk=pk)
    enrollments = Enrollment.objects.filter(student=student)
    return render(request, 'students/student_detail.html', {'student': student, 'enrollments': enrollments})
