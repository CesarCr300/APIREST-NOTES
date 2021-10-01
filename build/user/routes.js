"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _controllers = require("./controllers");

var router = (0, _express.Router)();
router.route("/").post(_controllers.postUser);
router.route("/token").get(_controllers.generateToken);
var _default = router;
exports.default = _default;