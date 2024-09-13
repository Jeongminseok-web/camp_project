const database = require("../database/database");

exports.getTasks = async (req, res) => {
  try {
    const result = await database.query(
      "SELECT * FROM task ORDER BY created_at DESC"
    );
    // console.log(tasks);
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ msg: "Get All Tasks Fail: " + error });
  }
};
