const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");


const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./User')(sequelize, Sequelize);

/*
db.Role = require('./Role')(sequelize, Sequelize);

 
db.Role.belongsToMany(db.User, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.User.belongsToMany(db.Role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});
 
db.ROLES = ["user", "admin", "moderator"];
*/

module.exports = db;