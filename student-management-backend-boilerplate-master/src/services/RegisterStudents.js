const db = require('../models');

class RegisterStudents {
  
  tutor;
  students;
  constructor(validatedArgs) {
    this.tutor = validatedArgs.tutor;
    this.students = validatedArgs.students;
  }

  async call() {

    let findTutor = await db.Tutor.findOne({
      where: {
        email: this.tutor 
      }
    });
    
    if(findTutor === null)  findTutor = await db.Tutor.create({ email: this.tutor });
    this.students.forEach( async (student) => {
        let findStudent = await db.Student.findOne({
          where: {
            email: student
          },
          defaults: {
            suspended: false
          }
        });
        if(findStudent === null)  findStudent = await db.Student.create({ email: student});

        await db.Tutor_Student.findOrCreate({
          where: {
            tutorId: findTutor.dataValues.id,
            studentId: findStudent.dataValues.id
          }
        })
    });
   
  }
}

module.exports = RegisterStudents;
