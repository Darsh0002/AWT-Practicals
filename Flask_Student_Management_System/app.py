from flask import Flask, render_template, request, redirect, url_for, flash
from models import db, Student, Course, Enrollment
from datetime import datetime
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///student_system.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'dev-secret-key'

db.init_app(app)

# Create database if it doesn't exist
with app.app_context():
    db.create_all()

@app.route('/')
def home():
    stats = {
        'students': Student.query.count(),
        'courses': Course.query.count(),
        'enrollments': Enrollment.query.count()
    }
    return render_template('index.html', stats=stats)

@app.route('/students/')
def student_list():
    students = Student.query.all()
    return render_template('students.html', students=students)

@app.route('/students/add', methods=['GET', 'POST'])
def add_student():
    if request.method == 'POST':
        first_name = request.form['first_name']
        last_name = request.form['last_name']
        email = request.form['email']
        dob_str = request.form['date_of_birth']
        
        try:
            date_of_birth = datetime.strptime(dob_str, '%Y-%m-%d').date()
            new_student = Student(
                first_name=first_name,
                last_name=last_name,
                email=email,
                date_of_birth=date_of_birth
            )
            db.session.add(new_student)
            db.session.commit()
            flash('Student added successfully!', 'success')
            return redirect(url_for('student_list'))
        except Exception as e:
            db.session.rollback()
            flash(f'Error adding student: {str(e)}', 'error')
            
    return render_template('add_student.html')

@app.route('/students/<int:id>/')
def student_detail(id):
    student = Student.query.get_or_404(id)
    return render_template('student_detail.html', student=student)

@app.route('/courses/')
def course_list():
    courses = Course.query.all()
    return render_template('courses.html', courses=courses)

@app.route('/courses/add', methods=['GET', 'POST'])
def add_course():
    if request.method == 'POST':
        course_code = request.form['course_code']
        course_name = request.form['course_name']
        credits = request.form['credits']
        
        try:
            new_course = Course(
                course_code=course_code,
                course_name=course_name,
                credits=int(credits)
            )

            db.session.add(new_course)
            db.session.commit()
            flash('Course added successfully!', 'success')
            return redirect(url_for('course_list'))
        except Exception as e:
            db.session.rollback()
            flash(f'Error adding course: {str(e)}', 'error')
            
    return render_template('add_course.html')

@app.route('/enrollments/')
def enrollment_list():
    enrollments = Enrollment.query.all()
    return render_template('enrollments.html', enrollments=enrollments)

@app.route('/enrollments/add', methods=['GET', 'POST'])
def add_enrollment():
    if request.method == 'POST':
        student_id = request.form['student_id']
        course_id = request.form['course_id']
        grade = request.form['grade']
        
        try:
            new_enrollment = Enrollment(
                student_id=int(student_id),
                course_id=int(course_id),
                grade=grade
            )
            db.session.add(new_enrollment)
            db.session.commit()
            flash('Enrollment successful!', 'success')
            return redirect(url_for('enrollment_list'))
        except Exception as e:
            db.session.rollback()
            flash(f'Error adding enrollment: {str(e)}', 'error')
            
    students = Student.query.all()
    courses = Course.query.all()
    return render_template('add_enrollment.html', students=students, courses=courses)

if __name__ == '__main__':
    app.run(debug=True)

