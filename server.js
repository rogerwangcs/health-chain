var path = require("path");
var express = require("express");
var cors = require("cors");
var app = express();

// solve cors problem
app.use(cors());

const port = process.env.PORT || 3000;

// serve react client
app.use(express.static(path.join(__dirname, "./public/build")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/build", "index.html"));
});

app.listen(port, function() {
  console.log("Listening on port " + port);
});
