const express = require("express");
const { v4: uuidv4 } = require("uuid");
const db = require("../db/notifications.db");

const router = express.Router();

// 📌 Get notifications
router.get("/", (req, res) => {
  const userId = req.query.userId;

  const data = db.getByUser(userId);

  res.json({ notifications: data });
});

// 📌 Create notification (Admin/System)
router.post("/", (req, res) => {
  const { userId, title, message } = req.body;

  const notification = {
    id: uuidv4(),
    userId,
    title,
    message,
    isRead: false,
    createdAt: new Date().toISOString()
  };

  db.add(notification);

  res.json({ success: true, notification });
});

// 📌 Mark as read
router.patch("/:id/read", (req, res) => {
  db.markRead(req.params.id);

  res.json({ success: true });
});

module.exports = router;