const express = require("express");
const app = express();
const path = require("path");
// var morgan = require("morgan");
// ---- dotenv
require("dotenv").config();

// ----cors
const cors = require("cors");
const options = {
  origin: "*",
};
app.use(cors(options));
// app.use(morgan(":method :url :status :response-time"));
// --- bodyParser
var bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
// parse application/json
app.use(bodyParser.json({ limit: "50mb" }));

// --- db connection
require("./DB/conn");

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/user", require("./routes/UserRoutes"));
app.use("/api/order", require("./routes/OrderRooute"));
app.use("/api/payment", require("./routes/PaymentRoute"));
app.use("/api/carousal", require("./routes/CrousalRoute"));
app.use("/api/address", require("./routes/UserAddressRouter"));
app.use("/api/transcation", require("./routes/TranscationRoute"));

// --- custom Error Handling;
app.use(require("./middleware/error"));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Task Backend",
  });
});

// --- server
const server = app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});

// ----Error Handling

// ----uncaughtException Error
process.on("uncaughtException", (err) => {
  console.log(`uncaughtException Error : ${err.message}`);
  console.log("Server is shutting down");
  server.close(() => {
    process.exit(1);
  });
});

// --- unhandledRejection Error
process.on("unhandledRejection", (err) => {
  console.log(`unhandledRejection Error : ${err.message}`);
  console.log("Server is shutting down");
  server.close(() => {
    process.exit(1);
  });
});
