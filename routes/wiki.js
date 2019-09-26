const express = require('express');
const wiki = express.Router();
const { Page } = require("../models");
const { addPage } = require("../views");
//connects the layout.js in views to app.js

wiki.get("/", (req, res, next) => {
  console.log("Default");
  res.send("Hi");
  next();
})


wiki.post("/", async (req, res, next) => {

  const page = new Page({
    title: req.body.title,

    content: req.body.pageContent
    

  });
  console.log(page);
  try {
    console.log('i came through')
    await page.save();
    res.redirect('/');
  } catch (error) {
    console.log('lol no i didnt');
    next(error); 
  }

  //res.send(page);
});

wiki.get("/add", (req, res, next) => {
  res.send(addPage());
})



module.exports = wiki;
