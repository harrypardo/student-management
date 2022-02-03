const db = require('../models');

class RetrieveNotifications {
  
  tutor;
  notification;
  constructor(validatedArgs) {
    this.tutor = validatedArgs.tutor;
    this.notification = validatedArgs.notification;
  }


  
  
  async call() {
   const emails = [];
   let i = 0;
   while (i < this.notification.length) {
      if(this.notification.charAt(i) === '@') {
            const start = i;
            while(i < this.notification.length) {
               
                if(this.notification.charAt(i) === ' ' || i === this.notification.length - 1 ) break;
                i++;
            }
            const end = i;
            emails.push(this.notification.substr(start + 1,end - start));
      } 
      i++;
    }

    const tutor = await db.Tutor.findOne({
        where: {
            email: this.tutor
        }
    });

   
    if(tutor === null) return [];
    
    const tutorStudents = await db.Tutor_Student.findAll({
        where: {
            tutorId: tutor.dataValues.id
        }
    });

 

    for(let i =0 ; i < tutorStudents.length; i++) {
        const student = await db.Student.findOne({
            where: {
                id: tutorStudents[i].dataValues.studentId
            }
        });
        if(student && !student.dataValues.suspended) {
            emails.push(student.dataValues.email)
        }
    }
     return [...new Set(emails)];
}
}

module.exports = RetrieveNotifications;
