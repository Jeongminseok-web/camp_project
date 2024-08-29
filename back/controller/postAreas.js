const database = require("../database/database");
const { v4: uuid4 } = require("uuid");

exports.postAreas = async (req, res) => {
  const { name, location, image, isadd, googleId } = req.body;
  const id = uuid4();
  console.log("test", id, name, location, image, isadd, googleId);

  try {
    await database.query(
      "INSERT INTO areas (id, name, location, image, isAdd, googleId) VALUES ($1, $2, $3, $4, $5, $6)",
      [id, name, location, image, isadd, googleId]
    );

    return res.status(200).json({ message: "Area Created Successfully" });
  } catch (error) {
    console.error("Database query error:", error);
    return res.status(500).json({ error: error.message });
  }
};
