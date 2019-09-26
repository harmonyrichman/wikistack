const express = require("express");
const morgan = require("morgan");
//take files out of it
const { db, Page, User } = require("./models");
//destructured db that will all be required from index.js in model (including page and user)
// OTHERWISE, could write as const models = require("./models"), but would need to call module with each export object
const userRouter = require("./routes/user");
const wikiRouter = require("./routes/wiki");

const app = express();

app.use(express.urlencoded({ extended: false }));
//built in middleware that parses incoming requests
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res, next) => {
  res.redirect("/wiki");
})

app.use('/user', userRouter);
app.use('/wiki', wikiRouter);

const { layout } = require("./views");
//connects the layout.js in views to app.js

app.get("/", (req, res, next) => {
  //url endpoint, callback
  res.send(layout("hello world"));
  //connects the css layout and sends the text 'hello world'
  //because of destructing, it pulls the function inside nad passes through 'hello world'
});

db.authenticate().then(() => {
  console.log("connected to the database now!");
  //db.authenticate will verify that the connection is working
});

const PORT = 3000;

// Sync up database and confirm we are connected to the port
const startUp = async () => {
  // sync up whole database based on the models in our models/index.js file. If we ever change how our models' attributes or options are defined, force: true drops the old version of the models and reinstantiates the new versions of the models
  await db.sync({force: true});
  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
    //this helps us 'listen' to the PORT and provides the localhost link
  });
};

startUp();
