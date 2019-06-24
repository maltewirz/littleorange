const express = require("express");
const app = express();
const path = require("path");
const server = require('http').Server(app);
const csurf = require("csurf");
const compression = require("compression");
const cookieSession = require("cookie-session");
// const { checkLoggedIn } = require('./middleware');
const secrets = (process.env.NODE_ENV == 'production') ? process.env : require("../secrets");
const cookieSessionMiddleware = cookieSession({
    secret: secrets.COOKIE_SECRET,
    maxAge: 1000 * 60 * 60 * 24 * 14
});
////////////////////////////////////
app.use(compression());
app.use(express.json());
app.use(cookieSessionMiddleware);
app.use(csurf());
//Middleware: csrfToken and forbid Header iframe
app.use((req, res, next) => {
    res.cookie('mytoken', req.csrfToken());
    res.setHeader('x-frame-options', 'DENY');
    next();
});
app.use(express.static(path.resolve(__dirname, "../react-ui/build")));

// Middleware: Global redirect for unregistered users
// app.use((req, res, next) => {
//     if (
//         !req.session.userId &&
//         req.url != "/welcome" &&
//         req.url != "/register" &&
//         req.url != "/login"
//     ) {
//         res.redirect("/welcome");
//     } else {
//         next();
//     }
// });


const register = require("./routers/register");
app.use(register);

const login = require("./routers/login");
app.use(login);

// Answer API requests.
app.get("/api/getInitialCookie", function(req, res) {
    res.json("cookie sent");
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
