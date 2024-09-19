const router = require("express").Router();
const { updateTask, updateCompletedTask } = require("../controller/updateTask");

router.put("/update_completed_task", updateCompletedTask);
router.patch("/update_task", updateTask);

module.exports = router;
