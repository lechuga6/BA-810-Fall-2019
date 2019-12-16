// Uses the constructor notation to define a Student object which includes.
// name and grades properties (grades is an array)
// addGrade method that adds a grade to the grades array
// totalGrades method that totals the grades in the grades array
// averageGrades method that returns the average of the grades or returns 0 if there are no grades
// Creates an instance of the Student object
// Writes the student name to the console
// Adds two grades to the student object
// Writes the total of the grades to the console
// Writes the average of the grades to the console

function Student(name, grades) {
    let student = {};

    student.name = name;
    student.grades = grades ? grades : [];
    student.addGrade = function(grade) {
        student.grades.push(grade);
    }
    student.totalGrades = function() {
        let total = 0;
        student.grades.forEach(item => {
            total += item;
        });
        return total;
    }
    student.averageGrades = function() {
        return student.totalGrades() / student.grades.length;
    }

    return student;
}

module.exports = Student;

let student1 = new Student('Anthony');
console.log(student1.name);

student1.addGrade(90);
student1.addGrade(93);

console.log(`The total grades for ${student1.name} is ${student1.totalGrades()}`);

console.log(`The average grades for ${student1.name} is ${student1.averageGrades()}`);
