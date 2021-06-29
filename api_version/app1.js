var express = require("express");
var api = express.Router();

api.get("/timezone", function(req, res) {
    res.send("Sample response for /timezone");
});
api.get("/all_timezones", function(req, res) {
    res.send("Sample response for /all_timezones");
});

api.get("/", function(req, res) {
  res.status(200);
  //res.send("you just sent a GET request, friend");
  res.json({ result: '成功了' });
});

api.post("/", function(req, res) {
  res.send("a POST request? nice");
});

api.put("/", function(req, res) {
  res.send("i don't see a lot of PUT requests anymore");
});

api.delete("/", function(req, res) {
  res.send("oh my, a DELETE??");
});


module.exports = api;