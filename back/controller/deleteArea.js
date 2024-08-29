const database = require("../database/database");

exports.deleteArea = async (req, res) => {
  const facltNm = req.params.itemId;

  try {
    console.log(facltNm);
    const result = await database.query("DELETE FROM areas WHERE name  = $1", [
      facltNm,
    ]);
    if (result.rowCount > 0) {
      return res.status(200).json({ message: "캠핑장이 삭제되었습니다." });
    } else {
      return res.status(404).json({ message: "캠핑장이 존재하지 않습니다." });
    }
  } catch (error) {
    onsole.error("Error deleting area:", error);
    return res.status(500).json({ msg: "Get Items Fail" + error });
  }
};
