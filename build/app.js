"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _routes = _interopRequireDefault(require("./note/routes"));

var _routes2 = _interopRequireDefault(require("./user/routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)();
app.use((0, _morgan.default)('tiny'));
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: true
})); //routes

app.use("/api/notes", _routes.default);
app.use("/api/user", _routes2.default);
app.get("/", (req, res) => {
  res.send("Home");
});
var _default = app;
exports.default = _default;