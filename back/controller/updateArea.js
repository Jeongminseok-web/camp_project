const database = require("../database/database");

exports.updateArea = async (req, res) => {
  const { isAdd, id } = req.body;

  try {
    const result = await database.query(
      "UPDATE areas SET isAdd = $1 WHERE _id = $2",
      [isAdd, id]
    );
    return res.status(200).json({ message: "Task Updated Successfully" });
  } catch (error) {
    return res.status(500).json({ msg: "Update Completed Fail" + error });
  }
};
