const router = require("express").Router();
const { postAreas } = require("../controller/postAreas");
const { postTasks } = require("../controller/postTasks");

router.post("/post_areas", postAreas);
router.post("/post_tasks", postTasks);

module.exports = router;
