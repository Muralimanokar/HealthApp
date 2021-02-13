module.exports = (sequelize, DataTypes) => {
    const usermapping = sequelize.define("usermapping", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
      },
      patient_id: {
        type: DataTypes.INTEGER
      }
    },
    );
    return usermapping;
  };