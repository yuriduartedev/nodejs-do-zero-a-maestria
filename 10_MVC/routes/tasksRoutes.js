const express = require("express");
const router = express.Router();

const TaskController = require("../controllers/TaskController");

router.get("/", TaskController.loadAllTasks);

router.get("/new", TaskController.craeteTask);
router.post("/new", TaskController.saveTask);

router.get("/edit/:id", TaskController.loadTask);
router.post("/edit/:id", TaskController.updateTask);

router.post("/update/status", TaskController.updateTaskStatus);
router.get("/show/:id", TaskController.showTask);

router.post("/delete", TaskController.deleteTask);

module.exports = router;
