module.exports = {
  <%_ if(packages.includes('hadron-express')) { _%>
  routes: {
    ...require('./routes'),
  },
  <%_ } _%>
}
