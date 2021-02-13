module.exports = (sequelize, DataTypes) => {
  const SharedRecord = sequelize.define("shared_record", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    record_id: {
      type: DataTypes.INTEGER
    }
  },
  {
    uniqueKeys: {
        Items_unique: {
            fields: ['user_id', 'record_id']
        }
    }
  });
  return SharedRecord;
};