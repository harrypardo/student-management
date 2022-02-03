const db = require('../models');

class GetCommonStudents {
  
  tutors;
  constructor(validatedArgs) {
    this.tutors = validatedArgs.tutor;
  }

  async call() {
 
  const ids = [];
  const count = {};
  const tutors = await db.Tutor.findAll({
       where: {
           email: this.tutors
       }
      });
  tutors.forEach((tutor) => ids.push(tutor.dataValues.id))
      
  const common = await db.Tutor_Student.findAll({
    where: {
        tutorId: ids
    },
   });   
   
   common.forEach((c) => count[c.dataValues.studentId] ? count[c.dataValues.studentId] += 1 : count[c.dataValues.studentId]= 1)
   const studentsId = [];
   for (const key in count) {
    
    if(count[key] === ids.length) {
        
        studentsId.push(key)
    }
   }
  
   const emails = [];
  const students = await db.Student.findAll({
    where: {
        id: studentsId
    }
   });
   students.forEach((student) => emails.push(student.dataValues.email))
   return {students: emails};
  }
}

module.exports = GetCommonStudents;
