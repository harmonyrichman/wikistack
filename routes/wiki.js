const express = require('express');
const wiki = express.Router();
const { addPage } = require("../views");
//connects the layout.js in views to app.js

wiki.get("/", (req, res, next) => {
  console.log("Default");
  res.send("Hi");
  next();
})

wiki.post("/", (req, res, next) => {
  console.log("Post-it");
  res.send("Posty post");
})

wiki.get("/add", (req, res, next) => {
  res.send(addPage());
})

module.exports = wiki;
