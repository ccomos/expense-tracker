const express = require('express')
const port = 3000
const app = express()
const exphbs = require('express-handlebars')
const Record = require('./models/record')
const Category = require('./models/category')
require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))

app.get('/', (req, res) => {
  let totalAmount = 0
  Record.find()
    .lean()
    .then(records => {
      for (let i = 0; i < records.length; i++) {
        totalAmount += records[i].amount
      }
      res.render('index', { records, totalAmount })
    })
    .catch(error => console.error(error))
  //res.render('index')
})

app.listen(port, () => {
  console.log(`App is listening on localhost:${port}`)
})
