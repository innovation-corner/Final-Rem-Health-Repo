const express = require("express");

const app = express();
const PORT = process.env.PORT || 4000

// const favicon = require("express-favicon");
const path = require("path");

// app.use(favicon(__dirname + "/build/favicon.ico"));
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));

app.get("/*", function(req, res) {
    console.log(req)
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => {
  console.log("Server is running at:", PORT);
});
