const mongoose = require("mongoose");
const  webFramework = require("express");
const router = webFramework.Router();

const MsgController = require("./message.controller");

router.get("/", MsgController.getAllMsg);

module.exports = router;
