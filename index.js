const express = require('express');
const routerApp = require('./routes/index');
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
} = require('./middleware/error.handler');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

const whiteList = ['https://localhost:8080', 'https://localhost:3000'];
const options = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Cors policy'));
    }
  },
};

app.use(express.json());
app.use(cors(options));
routerApp(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);
app.use(ormErrorHandler)

app.listen(port, () => {
  console.info(`Example app listening at http://localhost:${port}`);
});
