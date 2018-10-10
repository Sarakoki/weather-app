const express = require("express");
const db = require("./database/database.js");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//require("./routes")(app);

app.get("/", (req, res) => {
  res.send("listening on PORT 3001");
});

app.listen(3001, function() {
  console.log("listening on port 3001");
});
