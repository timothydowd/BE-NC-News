const app = require('express')();
const { apiRouter } = require('./routes/apiRouter');
const bodyParser = require('body-parser');
const { handle404, unrecognizedRoute } = require('./errorhandling/errorHandlers');


app.use(bodyParser.json());
app.use('/api', apiRouter);

app.use('/*', unrecognizedRoute);


module.exports = { app };
