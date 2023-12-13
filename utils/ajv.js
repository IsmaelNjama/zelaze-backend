const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const ajv = new Ajv({ allErrors: true }); // options can be passed, e.g. {allErrors: true}

addFormats(ajv);

ajv.addKeyword("isNotEmpty", {
  type: "string",
  validate: (schema, data) => {
    return typeof data === "string" && data.trim() !== "";
  },
  error: {
    message: "string field must not be empty",
  },
  errors: false,
});

module.exports = ajv;
