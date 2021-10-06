export const validationSchema = {
    "$schema": "http://json-schema.org/draft-07/schema",
    "$id": "http://example.com/example.json",
    "type": "object",
    "title": "The root schema",
    "description": "The root schema comprises the entire JSON document.",
    "default": {},
    "examples": [{
        "email": "email@gmail.com",
        "username": "username",
        "password": "password",
        "roles": [
            "role"
        ]
    }],
    "required": [
        "email",
        "username",
        "password",
        "roles"
    ],
    "properties": {
        "email": {
            "$id": "#/properties/email",
            "type": "string",
            "title": "The email schema",
            "description": "An explanation about the purpose of this instance.",
            "default": "",
            "examples": [
                "email@gmail.com"
            ]
        },
        "username": {
            "$id": "#/properties/username",
            "type": "string",
            "title": "The username schema",
            "description": "An explanation about the purpose of this instance.",
            "default": "",
            "examples": [
                "username"
            ]
        },
        "password": {
            "$id": "#/properties/password",
            "type": "string",
            "title": "The password schema",
            "description": "An explanation about the purpose of this instance.",
            "default": "",
            "examples": [
                "password"
            ]
        },
        "roles": {
            "$id": "#/properties/roles",
            "type": "array",
            "title": "The roles schema",
            "description": "An explanation about the purpose of this instance.",
            "default": [],
            "examples": [
                [
                    "role"
                ]
            ],
            "additionalItems": true,
            "items": {
                "$id": "#/properties/roles/items",
                "anyOf": [{
                    "$id": "#/properties/roles/items/anyOf/0",
                    "type": "string",
                    "title": "The first anyOf schema",
                    "description": "An explanation about the purpose of this instance.",
                    "default": "",
                    "examples": [
                        "role"
                    ]
                }]
            }
        }
    },
    "additionalProperties": true
}