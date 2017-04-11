var express = require('express')
var app = express()
var path = require('path')

app.use('/', express.static(path.join(__dirname, '/dist')))

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/src/app.html')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})