
const express = require('express')
const app = express()
const port = 4200
const routes = require('./routes');
const validateion=require('./validation');
const aa=require('./user');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(routes);

// app.get('/', (req, res) => {
//   res.send(aa.read())
// })

// app.get('/', (req, res) => {
//     res.send(validateion.phone('0548473653')) ;
//   })
  

app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
