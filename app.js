//Packages
const express = require("express");
const path = require("path");
const helmet = require("helmet");
const debug = require("debug")("dev");
const cookieParser = require("cookie-parser");
const compression = require("compression");

//Handles async errors in request pipeline
require("express-async-errors");

//Routes
const index = require("./routes/index.route");

//Application
const app = express();

//Port
const port = process.env.PORT || 3000;

//View Engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//Assets
app.use(express.static(__dirname + "/public"));

//Middleware
//Application vulnerability middleware

app.use(
    helmet.contentSecurityPolicy({
        useDefaults: true,
        directives: {
            "img-src": ["'self'", "https: data:"],
        },
    })
);

// compress all responses
app.use(compression());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Routes
app.use("/", index);

//Error Handler
//app.use(errorHandler);

//Start serving requests
app.listen(port, () => debug(`Express is running on port ${port}`));