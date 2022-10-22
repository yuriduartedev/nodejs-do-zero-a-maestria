const express = require("express");
const expressHandlebars = require("express-handlebars");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const flash = require("express-flash");
const path = require("path");
const os = require("os");

const app = express();
const port = 3000;

const conn = require("./db/conn");

// Models
const Tought = require("./models/Tought");
const User = require("./models/User");

// Routes
const toughtsRoutes = require("./routes/toughtsRoutes");

// Controllers
const ToughtController = require("./controllers/ToughtController");

// Initial config
app.engine("handlebars", expressHandlebars());
app.set("view engine", "handlebars");

// Middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(flash());

// Session middleware
app.use(
  session({
    name: "session",
    secret: "nosso_secret",
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function () {},
      path: path.join(os.tmpdir(), "sessions"),
    }),
    cookie: {
      secure: false,
      maxAge: 360000,
      express: new Date(Date.now() + 360000),
      httpOnly: true,
    },
  })
);

// Save session middleware
app.use((req, res, next) => {
  if (req.session.userId) {
    res.locals.session = req.session;
  }

  next();
});

app.use("/toughts", toughtsRoutes);

app.get("/", ToughtController.showToughts);

conn
  .sync({ force: false })
  .then(() => {
    app.listen(() => {
      console.log(`Server is running on port ${port}. 🚀`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
