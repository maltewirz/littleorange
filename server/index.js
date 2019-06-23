const express = require("express");
const app = express();
const path = require("path");
const server = require('http').Server(app);

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, "../react-ui/build")));

// Answer API requests.
app.get("/api/test", function(req, res) {
    res.json("successs!");
});

// All remaining requests return the React app, so it can handle routing.
app.get("*", function(request, response) {
    response.sendFile(
        path.resolve(__dirname, "../react-ui/build", "index.html")
    );
});

server.listen(process.env.PORT || 5000, () =>
    console.log("I'm listening on 5000.")
);
