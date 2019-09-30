const express = require("express");

const path = require("path");
const app = express();
const PORT = 4000;

app.use(express.static(path.join(__dirname, "build")));
app.use(express.static(__dirname));

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// app.use(favicon(__dirname + "/build/favicon.ico"));
// the __dirname is the current directory from where the script is running
// app.use(express.static(__dirname));

// app.get("/*", function(req, res) {
//     console.log(req)
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

app.listen(PORT, () => {
  console.log("Server is running at:", PORT);
});
