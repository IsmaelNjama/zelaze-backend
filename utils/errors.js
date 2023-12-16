module.exports = {
  ERR: [500, "Error accured"],
  ERR_NOT_FOUND: [404, "Not found"],
  ERR_NOT_ALLOWED: [401, "This is not allowed"],
  ERR_TOKEN_NOT_VERIFIED: [401, "Token not verified"],
  ERR_MISSING_PARAMS: [400, "Missing parameters"],
  LOGIN_NOT_AUTH: [401, "Not authorized,Please try again"],
  REGISTER_ALREADY_EXIST: [409, "Email already exist"],
};
