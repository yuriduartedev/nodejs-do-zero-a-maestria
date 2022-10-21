const express = require("express");
const expressHandlebars = require("express-handlebars");

const app = express();
const port = 3000;

const conn = require("./db/conn");

const Task = require("./models/Task");

const tasksRoutes = require("./routes/tasksRoutes");

app.engine("handlebars", expressHandlebars.engine());
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use("/tasks", tasksRoutes);

app.get("/", (req, res) => {
  res.send({ message: "Hello MVC" });
});

conn
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}. 🚀`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
