const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});

module.exports = app => {

  const User = sequelize.define("users", {
    /*
    username: {
      type: Sequelize.STRING
    },*/
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
  }, {
    timestamps: true,
  });
   
  return User;

}
