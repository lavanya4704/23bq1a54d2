let notifications = [];

module.exports = {
  notifications,

  add(notification) {
    notifications.push(notification);
  },

  getByUser(userId) {
    return notifications.filter(n => n.userId === userId);
  },

  markRead(id) {
    const n = notifications.find(n => n.id === id);
    if (n) n.isRead = true;
  }
};