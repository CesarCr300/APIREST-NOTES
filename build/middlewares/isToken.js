"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

var _model = require("../user/model");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var validateToken = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    try {
      var token = req.headers["x-access-token"];
      if (!token) return res.json({
        message: "You need a token"
      });

      var decoded = _jsonwebtoken.default.verify(token, _config.default.JWT_SECRET);

      req.idUser = decoded.id;
      var user = yield _model.User.findById(req.idUser);
      if (!user) return res.json({
        message: "You need a valid token"
      });
      next();
    } catch (err) {
      res.status(401).json({
        message: err.message
      });
    }
  });

  return function validateToken(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.validateToken = validateToken;