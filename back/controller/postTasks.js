const database = require("../database/database");
const { v4: uuid } = require("uuid");

exports.postTasks = async (req, res) => {
  const _id = uuid(); // UUID 생성
  const files = req.files;
  console.log(files);

  if (!files || files.length === 0) {
    return res.status(400).json({ error: "No files uploaded" });
  }
  // 파일 경로를 배열로 저장
  const imagePaths = files.map((file) => `/uploads/${file.filename}`);
  // const files = req.files;
  const { title, description, date, grade, userId, userName } = req.body; // content -> description으로 변경

  // const images = files.map((file) => file.path);

  try {
    console.log(files);
    // 데이터베이스에 삽입
    await database.query(
      `INSERT INTO task (_id, images, title, description, date, grade, userId, userName)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [_id, imagePaths, title, description, date, grade, userId, userName] // content -> description
    );

    return res.status(200).json({ message: "Task Created Successfully" });
  } catch (error) {
    console.error("Database Error:", error.message);
    return res.status(500).json({ error: error.message }); // error.message 출력
  }
};
