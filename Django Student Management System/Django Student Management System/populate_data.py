import os
import django
from datetime import date

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'student_management.settings')
django.setup()

from students.models import Student, Course, Enrollment

# Create sample students
student1 = Student.objects.create(
    first_name='John',
    last_name='Doe',
    email='john.doe@example.com',
    date_of_birth=date(2000, 1, 1)
)

student2 = Student.objects.create(
    first_name='Jane',
    last_name='Smith',
    email='jane.smith@example.com',
    date_of_birth=date(1999, 5, 15)
)

# Create sample courses
course1 = Course.objects.create(
    course_code='CS101',
    course_name='Introduction to Computer Science',
    description='Basic programming concepts',
    credits=3
)

course2 = Course.objects.create(
    course_code='MATH201',
    course_name='Calculus I',
    description='Differential and integral calculus',
    credits=4
)

# Create enrollments
Enrollment.objects.create(student=student1, course=course1)
Enrollment.objects.create(student=student1, course=course2)
Enrollment.objects.create(student=student2, course=course1)

print("Sample data created successfully!")