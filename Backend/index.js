const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const apiroutes = require("./Routes/api.routes");

const app = express();
const PORT = process.env.PORT || 5500;

mongoose
  .connect(process.env.URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Error connecting to database"));

app.use(bodyParser.json());
app.use(cookieParser());
const cors = require("cors");

app.use(
  cors({
    origin: "http://127.0.0.1:5500", // Ensure this matches your frontend's exact origin
    methods: ["GET", "POST", "PATCH", "DELETE"], // Allow specific HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow required headers
    credentials: true, // Allow cookies and authentication headers
  })
);
app.use("/api", apiroutes);
console.log("API routes registered!"); // Debugging

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
