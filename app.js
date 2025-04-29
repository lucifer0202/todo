const express = require("express");
require("dotenv").config();
const todoRoutes = require("./routes/todoRoutes");
const { requestLogger } = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
app.use(express.json());
app.use(requestLogger);

app.use("/api/todos", todoRoutes);

// 404 fallback
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

// Central error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
