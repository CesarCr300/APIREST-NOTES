"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateToken = exports.postUser = void 0;

var _model = require("./model");

var _model2 = require("../roles/model");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var postUser = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    var {
      email,
      username,
      password,
      roles
    } = req.body;
    var newUser = yield (0, _model.User)({
      email,
      username,
      password: yield _model.User.createPassword(password)
    });

    if (roles) {
      var rolesForUser = yield _model2.Role.find({
        name: {
          $in: roles
        }
      });
      newUser.roles = rolesForUser.map(role => role._id);
    } else {
      newUser.roles = _model2.Role.findOne({
        name: "user"
      });
    }

    yield newUser.save();
    res.json(newUser);
  });

  return function postUser(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.postUser = postUser;

var generateToken = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res, next) {
    var {
      username,
      password
    } = req.body;
    var user = yield _model.User.findOne({
      username
    });
    var isUser = yield _model.User.comparePassword(password, user.password);
    if (!isUser) return res.status(401).json({
      "message": "Username or password are not corrects"
    });
    var token = yield _jsonwebtoken.default.sign({
      id: user._id
    }, _config.default.JWT_SECRET, {
      expiresIn: 60 * 60 * 24
    });
    res.json(token);
  });

  return function generateToken(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}(); // export const updateUser = async(req, res, next) => {}
// export const destroyUser = async(req, res, next) => {}


exports.generateToken = generateToken;