const express = require('express');
const morgan = require('morgan');
//take files out of it 
const { db, Page, User } = require('./models');
//destructured db that will all be required from index.js in model (including page and user)

const app = express();

app.use(express.urlencoded({ extended: false}));
//built in middleware that parses incoming requests
app.use(express.static(__dirname + "/public"));

const { layout } = require('./views')
//connects the layout.js in views to app.js 

app.get('/',(req, res, next) => {
    //url endpoint, callback 
    res.send(layout('hello world'));
    //connects the css layout and sends the text 'hello world'
    //because of destructing, it pulls the function inside nad passes through 'hello world'
});

db.authenticate().
then(() => {
  console.log('connected to the database now!');
  //db.authenticate will verify that the connection is working 
})



const PORT = 3000;

app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
    //this helps us 'listen' to the PORT and provides the localhost link
});