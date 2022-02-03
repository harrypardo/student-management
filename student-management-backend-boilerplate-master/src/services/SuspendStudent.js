const db = require('../models');

class SuspendStudent {
  
  tutor;
  student;
  constructor(validatedArgs) {
    this.student = validatedArgs.student;
  }

  async call() {
    await db.Student.update(
        {suspended:  true},
        {where: {
            email: this.student
        }}
    )
  }
}

module.exports = SuspendStudent;
