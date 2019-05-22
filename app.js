const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const { apiRouter } = require('./routes/apiRouter');
const {
  handle404, handle422, handle400, unrecognizedRoute, handle500, handle405,
} = require('./errorhandling/errorHandlers');


app.use(bodyParser.json());
app.use(cors());
app.use('/api', apiRouter);

app.use('/*', unrecognizedRoute);
app.use(handle400);
app.use(handle422);
app.use(handle404);
app.use(handle500);
app.all(handle405);


module.exports = { app };
