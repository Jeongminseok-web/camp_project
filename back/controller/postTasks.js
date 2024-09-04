const database = require('../database/database');
const { v4: uuid } = require('uuid');

exports.postTasks = async (req, res) => {
  const _id = uuid(); // UUID 생성
  const { image, title, description, date, grade, userId } = req.body; // content -> description으로 변경
  const isCompleted = false; // 기본값

  try {
    // 데이터베이스에 삽입
    await database.query(
      `INSERT INTO task (_id, image, title, description, date, isCompleted, grade, userId)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [_id, image, title, description, date, isCompleted, grade, userId] // content -> description
    );

    return res.status(200).json({ message: 'Task Created Successfully' });
  } catch (error) {
    console.error('Database Error:', error.message);
    return res.status(500).json({ error: error.message }); // error.message 출력
  }
};
