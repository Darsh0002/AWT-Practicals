from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Student(db.Model):
    __tablename__ = 'students'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    date_of_birth = db.Column(db.Date, nullable=False)
    enrollment_date = db.Column(db.DateTime, default=datetime.utcnow)

    enrollments = db.relationship('Enrollment', backref='student', lazy=True, cascade="all, delete-orphan")

    def __repr__(self):
        return f'<Student {self.first_name} {self.last_name}>'

class Course(db.Model):
    __tablename__ = 'courses'
    id = db.Column(db.Integer, primary_key=True)
    course_code = db.Column(db.String(10), unique=True, nullable=False)
    course_name = db.Column(db.String(100), nullable=False)
    credits = db.Column(db.Integer, nullable=False)


    enrollments = db.relationship('Enrollment', backref='course', lazy=True, cascade="all, delete-orphan")

    def __repr__(self):
        return f'<Course {self.course_name}>'

class Enrollment(db.Model):
    __tablename__ = 'enrollments'
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'), nullable=False)
    enrollment_date = db.Column(db.DateTime, default=datetime.utcnow)
    grade = db.Column(db.String(2))

    __table_args__ = (db.UniqueConstraint('student_id', 'course_id', name='_student_course_uc'),)

    def __repr__(self):
        return f'<Enrollment {self.student_id} - {self.course_id}>'
