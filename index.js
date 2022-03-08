// import express
const express = require('express');
const app = express();

const router = require('./router');
const port = 3000;

const myLogger = function(req,res,next){
  console.log('Logged')
  next()
}

app.use(myLogger)
app.use(express.urlencoded( { extended: true} ));
app.use(express.json());

app.use(router) ;



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

