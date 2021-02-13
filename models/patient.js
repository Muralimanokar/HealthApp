module.exports = (sequelize, DataTypes) => {
    const patient = sequelize.define("patient", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
     
     name : {
        type: DataTypes.STRING
      },
      gender: {
        type: DataTypes.STRING
      },
      dob:{
          type:DataTypes.STRING
      },
      
    });
    return patient;
  };