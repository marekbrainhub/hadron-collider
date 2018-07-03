module.exports = {
  <%_ if(packages.includes('hadron-express')) { _%>
  routes: {
    ...require('./routes'),
  },
  <%_ } _%>
  <%_ if(packages.includes('hadron-typeorm')) { _%>
  connection: {
    ...require('./typeorm'),
  },
  entities: {
    ...require('./entities'),
  },
  <%_ } _%>
  <%_ if(packages.includes('hadron-events')) { _%>
  events: {
  ...require('./events'),
  },
  <%_ } _%>
};
