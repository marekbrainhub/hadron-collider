<%_ if(packages.includes('hadron-typeorm')) { _%>
module.exports = {
  name: 'User',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
    },
    age: {
      type: 'int',
    },
  },
};
<%_ } _%>
