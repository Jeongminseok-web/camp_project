const database = require("../database/database");
const { v4: uuid4 } = require("uuid");

exports.postAreas = async (req, res) => {
  const _id = uuid4();

  const { title, isAdd, userId } = req.body;

  try {
    await database.query(
      "INSERT INTO areas (_id, title, isAdd, userId) VALUES ($1, $2, $3, $4)",
      [_id, title, isAdd, userId]
    );

    return res.status(201).json({ message: "Area Created Successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
