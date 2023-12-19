require("dotenv").config();
require("./utils/postgres.js").run();
const jwt = require("./utils/jwt.js");
const usersService = require("./services/users.services.js");
const express = require("express");
const app = express();
const cors = require("cors");
const { LOGIN_NOT_AUTH } = require("./utils/errors.js");
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  req.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use(
  cors({
    origin: "*",
  })
);

//middleware

app.use(async (req, res, next) => {
  const publicRoutes = [
    { method: "POST", url: "/auth/register" },
    { method: "POST", url: "/auth/login" },
    { method: "GET", url: "/entries" },
    { method: "GET", url: "/users/:userId" },
  ];

  const isPublicRoutes = publicRoutes.find(
    (endpoint) =>
      req.method === endpoint.method && req.url.startsWith(endpoint.url)
  );

  if (isPublicRoutes) {
    return next();
  }

  const userIdRoutePattern = /^\/users\/\w+$/;

  if (req.method === "GET" && userIdRoutePattern.test(req.url)) {
    return next();
  }

  const token = req.headers.authorization;
  if (!token) {
    return next(LOGIN_NOT_AUTH);
  }

  try {
    const payload = jwt.verify(JSON.parse(token));
    // const payload = jwt.verify(token);
    const user = await usersService.getUserById(payload.userId);
    req.user = user;
  } catch (error) {
    next(LOGIN_NOT_AUTH);
  }

  console.log("middleware working okay");

  next();
});

//routes

app.use("/users", require("./routes/users.routes.js"));
app.use("/auth", require("./routes/auth.routes.js"));
app.use("/entries", require("./routes/entries.routes.js"));

app.use((err, req, res, next) => {
  try {
    const [statusCode, msg] = err;

    res.status(statusCode).send({
      error: true,
      message: msg,
    });
  } catch (error) {
    res.status(500).send({
      error: true,
      message: err.message,
    });
  }
});

app.listen(2555, function () {
  console.log(`listening on localhost ${PORT}`);
});
