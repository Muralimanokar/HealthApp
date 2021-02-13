module.exports = (sequelize, DataTypes) => {
    const emailsending = sequelize.define("emailsending", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
     
     from : {
        type: DataTypes.STRING
      },
      to: {
        type: DataTypes.STRING
      },
      subject:{
          type:DataTypes.STRING
      },
      emailtext_text:{
          type:DataTypes.STRING
      },
      time_stamp:{
          type:DataTypes.STRING
      }
      
    });
    return emailsending;
  };