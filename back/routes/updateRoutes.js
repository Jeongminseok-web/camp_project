const router = require("express").Router();
const { updateArea } = require("../controller/updateArea");

router.patch("/update_area", updateArea);

module.exports = router;
