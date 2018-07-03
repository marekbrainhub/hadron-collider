<%_ if(packages.includes('hadron-typeorm')) { _%>
const { user } = require('./entities');

module.exports = {
  connectionName: 'mysqlConnection',
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'hadron',
  entitySchemas: [user],
  synchronize: true,
};
<%_ } _%>
