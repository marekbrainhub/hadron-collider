const hadron = require('@brainhubeu/hadron-core').default;

<%_ packages.forEach(function(package, i) { _%>
const <%-camelCasePackages[i]-%> = require('@brainhubeu/<%-package%>')
<%_ }) _%>

<%_ if(packages.includes('hadron-express')) { _%>
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
<%_ } _%>

const config = require('./config');

const port = process.env.PORT || 8080;

const dependencies = [
  <%_ camelCasePackages.forEach(function(package) { _%>
  <%-package-%>,
  <%_ }) _%>
];

<%_ if(packages.includes('hadron-express')) { _%>
hadron(app, dependencies, config).then(() => {
  app.listen(port, () =>
    // eslint-disable-next-line no-console
    console.log(`Listening on http://localhost:${port}`),
  );
});
<%_ } _%>
