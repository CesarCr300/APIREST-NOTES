"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _model = require("../roles/model");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _default() {
  return _ref.apply(this, arguments);
}

function _ref() {
  _ref = _asyncToGenerator(function* () {
    var count = yield _model.Role.estimatedDocumentCount();
    if (count > 0) return;
    yield new _model.Role({
      name: "user"
    }).save();
  });
  return _ref.apply(this, arguments);
}