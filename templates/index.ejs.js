const hadron = require('@brainhubeu/hadron-core').default;

<%_ if(packages.includes('hadron-express')) { _%>
const express = require('express');
const app = express();
<%_ } _%>

const config = require('./config');

const port = process.env.PORT || 8080;

const dependencies = [
  <%_ packages.forEach(function(package) { _%>
  require('@brainhubeu/<%-package%>'),
  <%_ }) _%>
]

<%_ if(packages.includes('hadron-express')) { _%>
hadron(app, dependencies, config).then(() => {
  app.listen(port, () =>
    console.log(`Listening on http://localhost:${port}`),
  );
});
<%_ } _%>
