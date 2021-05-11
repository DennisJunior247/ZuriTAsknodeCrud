const express = require("express");
const mongoose = require("mongoose");

// importing app modlues
const crudOpration = require("./router");

const app = express();

app.use(express.json());

// app.use("/", crudOpration);
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
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening ${port}`));
