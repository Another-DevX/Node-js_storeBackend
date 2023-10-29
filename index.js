const express = require('express')
const routerApp = require('./routes/index')

const app = express()
const port = 3000

app.use(express.json())

routerApp(app)

app.listen(port, () => {
  console.info(`Example app listening at http://localhost:${port}`)
})
