const dbConfig = require("../config/config.js");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});


const db = {};
db.user = require("./user.js")(sequelize, Sequelize.DataTypes)
db.record = require("./record.js")(sequelize, Sequelize.DataTypes)
db.sharedRecord = require("./doctor_shared_record.js")(sequelize, Sequelize.DataTypes)
db.patient = require("./patient.js")(sequelize, Sequelize.DataTypes)
db.user_role_mapping = require("./user_role_mapping.js")(sequelize, Sequelize.DataTypes)
db.emailsending = require("./emailsending.js")(sequelize, Sequelize.DataTypes)
db.emailtext = require("./emailtext.js")(sequelize, Sequelize.DataTypes)
db.sequelize = sequelize

module.exports = db