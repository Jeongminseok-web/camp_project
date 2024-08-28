const router = require("express").Router();
const { deleteArea } = require("../controller/deleteArea");

router.delete("/delete_area/:itemId", deleteArea);

module.exports = router;
