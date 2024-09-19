const database = require("../database/database");
const fs = require("fs");
const path = require("path");

exports.deleteTask = async (req, res) => {
  const itemId = req.params.itemId;
  const { images } = req.body; // 삭제할 이미지 이름 목록

  try {
    const result = await database.query("DELETE FROM task WHERE _id  = $1", [
      itemId,
    ]);

    // 이미지 파일 삭제
    if (images && images.length > 0) {
      images.forEach((image) => {
        const filePath = path.join(__dirname, "../uploads", image); // 이미지 경로 조정 필요
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(`Failed to delete image ${image}:`, err);
          }
        });
      });
    }
    return res.status(200).json({ message: "Task Deleted Successfully" });
  } catch (error) {
    return res.status(500).json({ msg: "Get Items Fail" + error });
  }
};
