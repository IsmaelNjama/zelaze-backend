require("dotenv").config();
require("./utils/postgres.js").run();

const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 2555;

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

//middleware

app.use((req, res, next) => {
  console.log("middleware working okay");

  next();
});

//routes

app.use("/users", require("./routes/users.routes.js"));
app.use("/auth", require("./routes/auth.routes.js"));

app.use((err, req, res, next) => {
  console.log(err);

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
