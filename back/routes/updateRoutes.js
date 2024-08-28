const router = require("express").Router();
const { updateArea } = require("../controller/updateArea");

router.put("/update_area", updateArea);

module.exports = router;
