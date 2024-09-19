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
  const { title, description, date, isCompleted, grade, id } = req.body;
  const files = req.files; // 새로 업로드된 파일들

  try {
    // 기존 이미지 경로를 가져옵니다.
    const existingTask = await database.query(
      "SELECT images FROM task WHERE _id = $1",
      [id]
    );

    const imagePaths = existingTask.rows[0]?.images || []; // 기존 이미지 경로
    if (files && files.length > 0) {
      // 새로 업로드된 이미지 경로를 추가합니다.
      const newImagePaths = files.map((file) => `/uploads/${file.filename}`);
      imagePaths = [...imagePaths, ...newImagePaths];
    }

    await database.query(
      "UPDATE task SET title = $1, description = $2, date = $3, iscompleted = $4, grade = $5, images = $6 WHERE _id = $7",
      [title, description, date, isCompleted, grade, imagePaths, id]
    );

    return res.status(200).json({ message: "Task Updated Successfully" });
  } catch (error) {
    return res.status(500).json({ msg: "Update Failed: " + error.message });
  }
};
