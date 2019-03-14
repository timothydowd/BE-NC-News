const app = require('express')();
const { apiRouter } = require('./routes/apiRouter');
const bodyParser = require('body-parser');
const {
  handle404, handle422, handle400, unrecognizedRoute,
} = require('./errorhandling/errorHandlers');


app.use(bodyParser.json());
app.use('/api', apiRouter);

app.use('/*', unrecognizedRoute);
app.use(handle400);
app.use(handle422);
app.use(handle404);

module.exports = { app };
