const express = require("express");
const app = express();
const port = 3000;

const path = require("path");
const basePath = path.resolve(__dirname, "templates");

const contact = require("./router/contact");
const about = require("./router/about");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(`${basePath}/index.html`);
});

// app.get("/about", (req, res) => {
//   res.sendFile(`${basePath}/contact.html`);
// });

app.use("/contact", contact);
app.use("/about", about);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}. 🚀`);
});
