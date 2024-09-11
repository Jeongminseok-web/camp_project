const router = require("express").Router();
const upload = require("../middleware/multer"); // multer 설정 파일
const { postAreas } = require("../controller/postAreas");
const { postTasks } = require("../controller/postTasks");

// upload.array("images", 5),
router.post("/post_areas", postAreas);
router.post("/post_tasks", upload.single("images"), postTasks);

module.exports = router;
