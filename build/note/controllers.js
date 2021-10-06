"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.destroyNote = exports.updateNote = exports.postNote = exports.getNote = exports.getNotes = void 0;

var _model = require("./model");

var _model2 = require("../user/model");

var _validation = require("./validation");

var _jsonschema = require("jsonschema");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getNotes = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    try {
      var user = yield _model2.User.findById(req.idUser).populate("notes");
      var notesByUser = user.notes;
      res.status(200).json(notesByUser);
    } catch (err) {
      res.status(400).json({
        err: err.message
      });
    }
  });

  return function getNotes(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.getNotes = getNotes;

var getNote = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res, next) {
    try {
      var user = yield _model2.User.findById(req.idUser).populate("notes");
      var {
        noteId
      } = req.params;
      var note = yield _model.Note.findById(noteId);
      return res.status(200).json(note);
    } catch (err) {
      res.status(404).json({
        err: err.message
      });
    }
  });

  return function getNote(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getNote = getNote;

var postNote = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res, next) {
    try {
      var user = yield _model2.User.findById(req.idUser);
      var {
        title,
        text
      } = req.body;
      var result = (0, _jsonschema.validate)({
        title,
        text
      }, _validation.validationSchema);
      if (!result.valid) return res.status(400).json({
        error: result.errors.map(error => error.stack)
      });
      var note = (0, _model.Note)({
        title,
        text
      });
      var savedNote = yield note.save();
      yield user.notes.push(savedNote);
      yield user.save();
      res.status(201).json(savedNote);
    } catch (err) {
      res.status(400).json({
        error: err.message
      });
    }
  });

  return function postNote(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

exports.postNote = postNote;

var updateNote = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res, next) {
    try {
      var {
        title,
        text
      } = req.body;
      var result = (0, _jsonschema.validate)({
        title,
        text
      }, _validation.validationSchema);
      if (!result.valid) return res.status(400).json({
        error: result.errors.map(err => err.stack)
      });
      var {
        noteId
      } = req.params;
      var note = yield _model.Note.findByIdAndUpdate(noteId, {
        title,
        text
      }, {
        new: true
      });
      res.json(note);
    } catch (err) {
      res.status(400).json({
        error: err.message
      });
    }
  });

  return function updateNote(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateNote = updateNote;

var destroyNote = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res, next) {
    try {
      var {
        noteId
      } = req.params;
      var user = yield _model2.User.findById(req.idUser);
      var note = yield _model.Note.findByIdAndDelete(noteId, {
        new: true
      });
      user.notes.splice(noteId, 1);
      yield user.save();
      res.json({
        note,
        message: "Note deleted"
      });
    } catch (err) {
      res.status(400).json({
        error: err.message
      });
    }
  });

  return function destroyNote(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();

exports.destroyNote = destroyNote;