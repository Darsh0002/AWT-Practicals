from app import app
from models import db, Student, Course, Enrollment
from datetime import date
import random

def seed_data():
    with app.app_context():
        # Clean existing data
        db.drop_all()
        db.create_all()

        print("Seeding database...")

        # Create Students
        students = [
            Student(first_name="Alice", last_name="Johnson", email="alice@example.com", date_of_birth=date(2002, 5, 14)),
            Student(first_name="Bob", last_name="Smith", email="bob@example.com", date_of_birth=date(2001, 11, 22)),
            Student(first_name="Charlie", last_name="Brown", email="charlie@example.com", date_of_birth=date(2003, 1, 10)),
            Student(first_name="Diana", last_name="Prince", email="diana@example.com", date_of_birth=date(2002, 8, 30)),
            Student(first_name="Ethan", last_name="Hunt", email="ethan@example.com", date_of_birth=date(2001, 3, 15)),
        ]
        db.session.add_all(students)

        # Create Courses
        courses = [
            Course(course_code="CS101", course_name="Introduction to Computer Science", credits=4),
            Course(course_code="CS202", course_name="Database Systems", credits=3),
            Course(course_code="MATH301", course_name="Discrete Mathematics", credits=4),
            Course(course_code="CS404", course_name="Web Development", credits=3),
        ]

        db.session.add_all(courses)
        db.session.commit()

        # Create Enrollments
        grades = ['A', 'B', 'C', 'D', 'F', None]
        for s in students:
            # Enroll each student in 2 random courses
            enrolled_courses = random.sample(courses, 2)
            for c in enrolled_courses:
                enrollment = Enrollment(
                    student_id=s.id,
                    course_id=c.id,
                    grade=random.choice(grades)
                )
                db.session.add(enrollment)

        db.session.commit()
        print("Database seeded successfully!")

if __name__ == "__main__":
    seed_data()
