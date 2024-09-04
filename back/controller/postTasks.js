const database = require("../database/database");
const { v4: uuid } = require("uuid");

exports.postTasks = async (req, res) => {
  const _id = uuid();
  const { image, title, description, date, isCompleted, userId } = req.body;
  // console.log(title, description, date, isCompleted, isImportant, userId);

  try {
    await database.query(
      `INSERT INTO task (_id, image, title, description, date, isCompleted, userId)
        VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [_id, image, title, description, date, isCompleted, userId]
    );

    return res.status(200).json({ message: "Task Created Successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
