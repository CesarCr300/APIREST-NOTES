"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validationSchema = void 0;
var validationSchema = {
  "$schema": "http://json-schema.org/draft-07/schema",
  "$id": "http://example.com/example.json",
  "type": "object",
  "title": "The root schema",
  "description": "The root schema comprises the entire JSON document.",
  "default": {},
  "examples": [{
    "title": "TITLE",
    "text": "TEXT"
  }],
  "required": ["title", "text"],
  "properties": {
    "title": {
      "$id": "#/properties/title",
      "type": "string",
      "title": "The title schema",
      "description": "An explanation about the purpose of this instance.",
      "default": "",
      "examples": ["TITLE"]
    },
    "text": {
      "$id": "#/properties/text",
      "type": "string",
      "title": "The text schema",
      "description": "An explanation about the purpose of this instance.",
      "default": "",
      "examples": ["TEXT"]
    }
  },
  "additionalProperties": true
};
exports.validationSchema = validationSchema;