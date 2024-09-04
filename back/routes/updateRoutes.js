const router = require("express").Router();
const { updateTask, updateCompletedTask } = require("../controller/updateTask");

router.patch("/update_completed_task", updateCompletedTask);
router.put("/update_task", updateTask);

module.exports = router;
