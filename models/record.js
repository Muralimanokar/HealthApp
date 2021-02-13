module.exports = (sequelize, DataTypes) => {
  const Record = sequelize.define("record", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    section: {
      type: DataTypes.STRING
    },
    desc: {
      type: DataTypes.STRING
    },
    time_stamp: {
      type: DataTypes.STRING
    }
  });
  return Record;
};