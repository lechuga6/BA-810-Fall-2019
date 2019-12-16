function Roster(students) {
    let roster = students ? students : [];

    roster.addStudent = function (student) {
        roster.push(student);
    }

    roster.calcGrades = function() {
        let averages = [];
        roster.students.forEach(item => {
            averages.push(item.averageGrades());
        });

        return averages;
    }
    
    return roster;
}

module.exports = Roster;