require("dotenv").config();

const express = require("express");
const cors = require("cors");
require("./db/db");
const { databaseSetup } = require("./db/createTables");
const path = require("path");

// Database Connection
databaseSetup();

const app = express();
const port = 5000 || process.env.PORT;

// Middleware
app.use(cors());

// const multer  = require('multer')
// const upload = multer({ dest: 'public/images/' })
// app.post('/api/image/upload-image', upload.single('image'), function (req, res, next) {
//   console.log("REQUEST RECEIVED")
//   // req.file is the `avatar` file
//   // req.body will hold the text fields, if there were any
//   // console.log(req.body.image[0])
//   console.log(req.file)
// })

app.use(express.json());

app.use(
  "/api/public/images",
  express.static(path.join(__dirname, "/public/images"))
);

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
const userRoutes = require("./routes/user");
app.use("/api/user", userRoutes);
const userPreferencesRoutes = require("./routes/userPreferences");
app.use("/api/user-preferences", userPreferencesRoutes);
const subscriptionRoutes = require("./routes/subscription");
app.use("/api/subscription", subscriptionRoutes);
const newsRoutes = require("./routes/news");
app.use("/api/news", newsRoutes);
const categoriesRoutes = require("./routes/categories");
app.use("/api/categories", categoriesRoutes);
const imageRoutes = require("./routes/image");
app.use("/api/image", imageRoutes);

// Error Handler
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  console.log(err);
  res.status(500).json({error: err});
});

//Scripts Scheduling
const cron = require("node-cron");
const { fetchAndStoreNews } = require("./scripts/fetchNews");
// fetchAndStoreNews(100);
cron.schedule("0 * * * *", () => {
  fetchAndStoreNews(10);
});

app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});
