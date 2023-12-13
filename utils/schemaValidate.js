const ajv = require("./ajv");

const validate = (schema) => {
  return (req, res, next) => {
    const data = req.body;

    const validate = ajv.compile(schema);
    const valid = validate(data);

    if (!valid) {
      console.error(validate.errors);
      const message = validate.errors
        .map((item) => {
          return `${item.instancePath.slice(1)}:${item.message}`;
        })
        .join(",");

      return next([400, message]);
    }

    next();
  };
};

module.exports = validate;
