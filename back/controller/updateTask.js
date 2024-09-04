const database = require("../database/database");

exports.updateCompletedTask = async (req, res) => {
  const { isCompleted, itemId } = req.body;
  try {
    const result = await database.query(
      "UPDATE task SET iscompleted = $1 WHERE _id = $2",
      [isCompleted, itemId]
    );
    return res.status(200).json({ message: "Task Updated Successfully" });
  } catch (error) {
    return res.status(500).json({ msg: "Update Completed Fail" + error });
  }
};

exports.updateTask = async (req, res) => {
  const { image, title, description, date, isCompleted, grade, id } = req.body;
  try {
    const result = await database.query(
      "UPDATE task SET image = $1, title = $2, description = $3, date = $4, iscompleted = $5, grade = $6, WHERE _id = $7",
      [image, title, description, date, isCompleted, grade, id]
    );
    return res.status(200).json({ message: "Task Updated Successfully" });
  } catch (error) {
    return res.status(500).json({ msg: "Update Completed Fail" + error });
  }
};
