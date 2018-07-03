<%_ if (packages.includes('hadron-express')) { _%>
module.exports = {
  ...require('./helloWorld'),
  <%_ if (packages.includes('hadron-typeorm')) { _%>
  ...require('./user'),
  <%_ } _%>
}
<%_ } _%>
