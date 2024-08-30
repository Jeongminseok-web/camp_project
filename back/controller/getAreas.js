const database = require("../database/database");

exports.getAreas = async (req, res) => {
  const googleId = req.params.googleId;
  // console.log(googleId);

  try {
    const result = await database.query(
      "SELECT * FROM areas WHERE googleId = $1",
      [googleId]
    );
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ msg: "Get Items Fail" + error });
  }
};
