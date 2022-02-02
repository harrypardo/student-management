const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tutor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id;
    email;

    static associate(models) {
      // define association here
       this.belongsToMany(models.Student, { as: 'tutor', through: "Tutor_Student", foreignKey: 'tutorId' });
    }
  }


  Tutor.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        },
      },
    },

    {
      sequelize,
      modelName: "Tutor",
    }
  );
  return Tutor;
};
