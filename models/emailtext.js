module.exports = (sequelize, DataTypes) => {
    const emailtext = sequelize.define("emailtext", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      text: {
        type: DataTypes.STRING,
      },
    });
    return emailtext;
  };