const express = require("express");
const app = express();
const server = require('http').Server(app);

app.use(express.static("./public"));


app.get("/test", function(req, res) {
    res.json("successs!");
});

// app.get("*", function(req, res) {
//     // console.log(__dirname + "/index.html");
//     res.sendFile("./public/index.html");
// });

server.listen(process.env.PORT || 8080, () =>
    console.log("I'm listening on 8080.")
);
