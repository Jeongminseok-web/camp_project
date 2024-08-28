const router = require("express").Router();
const { postAreas } = require("../controller/postAreas");

router.post("/post_areas", postAreas);

module.exports = router;
