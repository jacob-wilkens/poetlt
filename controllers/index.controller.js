const debug = require("debug")("dev");

module.exports.get = async(req, res) => {
    return res.render("index", { title: "Poetlt", playerId: "201935", teamId: "1610612756" });
};

module.exports.post = async(req, res) => {
    return res.send("hello");
};