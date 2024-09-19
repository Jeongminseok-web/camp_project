const router = require("express").Router();
const { deleteArea } = require("../controller/deleteArea");
const { deleteTask } = require("../controller/deleteTask");

router.delete("/delete_area/:itemId", deleteArea);
router.delete("/delete_task/:itemId", deleteTask);

module.exports = router;
