const Task = require("../models/Task");

module.exports = class TaskController {
  static craeteTask(req, res) {
    res.render("tasks/new");
  }

  static async saveTask(req, res) {
    const task = {
      ...req.body,
      done: false,
    };

    await Task.create(task);

    res.redirect("/tasks");
  }

  static async loadTask(req, res) {
    const { id } = req.params;

    const task = await Task.findOne({ raw: true, where: { id } });

    res.render("tasks/edit", { task });
  }

  static async updateTask(req, res) {
    const { id } = req.params;
    const { title, description } = req.body;

    const taskData = {
      title,
      description,
    };

    await Task.update(taskData, { where: { id } });

    res.redirect("/tasks");
  }

  static async updateTaskStatus(req, res) {
    const { id, done } = req.body;

    const taskData = {
      done: done == 0 ? true : false,
    };

    await Task.update(taskData, { where: { id } });

    res.redirect("/tasks");
  }

  static async loadAllTasks(req, res) {
    const tasks = await Task.findAll({ raw: true });

    res.render("tasks/index", { tasks });
  }

  static async showTask(req, res) {
    const { id } = req.params;

    const task = await Task.findOne({ raw: true, where: { id } });

    res.render("tasks/show", { task });
  }

  static async deleteTask(req, res) {
    const { id } = req.body;

    await Task.destroy({ where: { id } });

    res.redirect("/tasks");
  }
};
