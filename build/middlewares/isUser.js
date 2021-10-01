"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isUser = void 0;

var _model = require("../user/model");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var isUser = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    var user = yield _model.User.find({
      _id: req.idUser,
      notes: req.params.noteId
    });
    if (user.length === 0) return res.status(404).json({
      message: "You need a valid Note-Id"
    });
    next();
  });

  return function isUser(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.isUser = isUser;