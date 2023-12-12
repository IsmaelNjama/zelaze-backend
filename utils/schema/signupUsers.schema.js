const schema = {
  type: "object",
  properties: {
    firstname: { type: "string", isNotEmpty: true },
    lastname: { type: "string", isNotEmpty: true },
    email: { type: "string", format: "email" },
    password: { type: "string" },
    phonenumber: { type: "string" },
    address: { type: "string" },
    description: { type: "string" },
    role: { type: "string" },
    pseudo: { type: "string" },
  },
  required: [
    "firstname",
    "lastname",
    "email",
    "password",
    "phonenumber",
    "role",
    "pseudo",
  ],
  additionalProperties: true,
};

module.exports = schema;
