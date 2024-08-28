const database = require("../database/database");

exports.deleteArea = async (req, res) => {
  const itemId = req.params.itemId;

  try {
    const result = await database.query("DELETE FROM areas WHERE _id  = $1", [
      itemId,
    ]);
    return res.status(200).json({ message: "Areas Deleted Successfully" });
  } catch (error) {
    return res.status(500).json({ msg: "Get Items Fail" + error });
  }
};
