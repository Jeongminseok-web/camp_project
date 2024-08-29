const database = require("../database/database");

exports.updateArea = async (req, res) => {
  const { name, location, image, isAdd, googleId } = req.body;
  if (!name || !location || !image || typeof isAdd !== "boolean" || !googleId) {
    return res.status(400).json({ msg: "Invalid input data" });
  }

  try {
    const result = await database.query(
      "UPDATE areas SET isAdd = $1, location = $2, image = $3, isAdd = $4, WHRER googleId =$5 RETRNING *",
      [name, location, image, isAdd, googleId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "No record found to update" });
    }
    console.log("Update result:", result);
    return res.status(200).json({ message: "Task Updated Successfully" });
  } catch (error) {
    console.error("Update failed:", error);
    return res.status(500).json({ msg: "Update Completed Fail" + error });
  }
};
