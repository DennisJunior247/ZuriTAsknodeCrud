const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
//connecting .env
dotenv.config({ path: "./config.env" });

// importing app modlues
const crudOpration = require("./router");

const app = express();

app.use(express.json());

app.use("/", crudOpration);
app.all("*", (req, res, next) => {
  next(
    new res.status(404).send(`Can't find ${req.originalUrl} on this server!`)
  );
});
app.use(function error500(error, req, res, next) {
  res.status(error.status || 500);
  res.json({
    error: {
      error: error.message,
    },
  });
});

// connecting to mongo db
const db =
  "mongodb+srv://dennis:08051206966d@cluster0.eof3h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(console.log(`db connected at ${db}`))
  .catch((err) => console.error(err));

// listing to server
const port =
  process.env.NODE_ENV === "development"
    ? 3000
    : "https://zuritask-node-crud.herokuapp.com/";

app.listen(port, () => console.log(`listening ${port}`));
