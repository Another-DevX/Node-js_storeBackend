const express = require('express');
const routerApp = require('./routes/index');
const { logErrors, errorHandler, boomErrorHandler } = require('./middleware/errorHandler');

const app = express();
const port = 3000;

app.use(express.json());

routerApp(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.info(`Example app listening at http://localhost:${port}`);
});
