module.exports = (req, res, next) => {
  const { title, status } = req.body;

  if (!title || typeof title !== "string") {
    return res
      .status(400)
      .json({ error: "Title is required and must be a string" });
  }

  if (status && !["pending", "in-progress", "done"].includes(status)) {
    return res.status(400).json({ error: "Invalid status value" });
  }

  next();
};
