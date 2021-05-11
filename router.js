const express = require("express");
const Crud = require("./model");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await Crud.find();
    res.status(200).json({
      status: "sucessful",
      data,
    });
  } catch (error) {
    res.status(error.status).json({
      status: "Unsucessful",
      error,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { email, name, country } = req.body;

    if (!email || !name || !country)
      res.status(400).send("body must not be empty");

    const data = await Crud.create(req.body);

    res.status(201).json({
      status: "sucessful",
      data,
    });
  } catch (error) {
    res.status(error.status).json({
      status: "Unsucessful",
      error,
    });
  }
});

router.delete("/", async (req, res) => {
  try {
    await Crud.deleteMany();

    res.status(201).json({
      status: "sucessful",
      data: null,
    });
  } catch (error) {
    res.status(error.status).json({
      status: "Unsucessful",
      error,
    });
  }
});

router.get("/id", async (req, res) => {
  try {
    const id = req.params.id;

    const data = await Crud.findById(id);

    if (!data) res.status(400).send("invalid id");

    res.status(200).json({
      status: "sucessful",
      data,
    });
  } catch (error) {
    res.status(error.status).json({
      status: "Unsucessful",
      error,
    });
  }
});

router.patch("/id", async (req, res) => {
  try {
    const data = await Crud.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!data) res.status(400).send("invalid id");

    res.status(201).json({
      status: "sucessful",
      data,
    });
  } catch (error) {
    res.status(error.status).json({
      status: "Unsucessful",
      error,
    });
  }
});

router.delete("/id", async (req, res) => {
  try {
    const id = await Crud.findByIdAndDelete(req.params.id);
    if (!id) res.status(400).send("invalid id");

    res.status(201).json({
      status: "sucessful",
      data: null,
    });
  } catch (error) {
    res.status(error.status).json({
      status: "Unsucessful",
      error,
    });
  }
});

module.exports = router;
