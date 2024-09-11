const database = require("../database/database");
const { v4: uuid } = require("uuid");

exports.postTasks = async (req, res) => {
  const _id = uuid(); // UUID 생성
  const files = req.files;
  console.log(files);
  // const files = req.files;
  const { title, description, date, grade, userId } = req.body; // content -> description으로 변경

  // const images = files.map((file) => file.path);

  // console.log(files[0]);
  // 파일 경로 배열 생성
  // const image1 = files[0] ? files[0].path : null;
  // const image2 = files[1] ? files[1].path : null;
  // const image3 = files[2] ? files[2].path : null;
  // const image4 = files[3] ? files[3].path : null;
  // const image5 = files[4] ? files[4].path : null;

  const image1 = files[0];
  const image2 = files[1];
  const image3 = files[2];
  const image4 = files[3];
  const image5 = files[4];

  try {
    console.log(files);
    // 데이터베이스에 삽입
    await database.query(
      `INSERT INTO task (_id, image1, image2, image3, image4, image5, title, description, date, grade, userId)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
      [
        _id,
        image1,
        image2,
        image3,
        image4,
        image5,
        title,
        description,
        date,
        grade,
        userId,
      ] // content -> description
    );

    return res.status(200).json({ message: "Task Created Successfully" });
  } catch (error) {
    console.error("Database Error:", error.message);
    return res.status(500).json({ error: error.message }); // error.message 출력
  }
};
