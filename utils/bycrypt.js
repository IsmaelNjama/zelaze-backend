const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  hashPassword: (password) => {
    return new Promise((res, rej) => {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
          return rej(err);
        }

        res(hash);
      });
    });
  },
  validatePassword: (password, hash) => {
    return new Promise((res, rej) => {
      bcrypt.compare(password, hash, function (err, isValid) {
        if (err) {
          return rej(err);
        }
        res(isValid);
      });
    });
  },
};
