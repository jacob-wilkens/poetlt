//Router
const router = require("express").Router();

//Controller
const indexController = require("../controllers/index.controller");

//Render page on get request
router.get("/", indexController.get);

//Accept post
router.post("/", indexController.post);

//Export router for app.js
module.exports = router;