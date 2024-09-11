const database = require("../database/database");

// exports.getTasks = async (req, res) => {
//   const userId = req.params.userId;

//   try {
//     const result = await database.query(
//       "SELECT * FROM task WHERE userId = $1 ORDER BY created_at DESC",
//       [userId]
//     );
//     return res.status(200).json(result.rows);
//   } catch (error) {
//     return res.status(500).json({ msg: "Get Items Fail" + error });
//   }
// };

exports.getTasks = async (req, res) => {
  try {
    const result = await database.query(
      "SELECT * FROM task ORDER BY created_at DESC"
    );
    const tasks = result.rows.map((task) => ({
      ...task,
      // images: {
      //   image1: JSON.parse(task.image1),
      //   image2: JSON.parse(task.image2),
      //   image3: JSON.parse(task.image3),
      // }, // 저장된 JSON 문자열을 배열로 변환
    }));
    // console.log(tasks);
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ msg: "Get All Tasks Fail: " + error });
  }
};
