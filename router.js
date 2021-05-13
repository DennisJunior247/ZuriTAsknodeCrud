const express = require("express");
const Crud = require("./model");
const router = express.Router();



router.post("/", async (req, res) => {
  try {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  } catch (error) {
    res.status(error.status).json({
      status: "Unsucessful",
      error,
    });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const data = await Crud.findById(req.params.id);

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

router.patch("/:id", async (req, res) => {
  try {
    const doc = await Crud.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  } catch (error) {
    res.status(error.status).json({
      status: "Unsucessful",
      error,
    });
  }
});

router.delete("/:id", async (req, res) => {
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
