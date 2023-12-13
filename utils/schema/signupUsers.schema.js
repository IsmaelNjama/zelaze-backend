const schema = {
  type: "object",
  properties: {
    firstname: { type: "string", isNotEmpty: true },
    lastname: { type: "string", isNotEmpty: true },
    email: { type: "string", format: "email", isNotEmpty: true },
    password: { type: "string", isNotEmpty: true },
    phone: { type: "string", isNotEmpty: true },
    address: { type: "string", isNotEmpty: true },

    admin: { type: "boolean" },
    bio: { type: "string", isNotEmpty: true },
  },
  required: [
    "firstname",
    "lastname",
    "email",
    "password",
    "phone",
    "admin",
    "bio",
  ],
  additionalProperties: true,
};

module.exports = schema;
