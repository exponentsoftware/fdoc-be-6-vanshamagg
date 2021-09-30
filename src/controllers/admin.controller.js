const { User } = require('../database');

async function getUsersForToday(req, res) {
  try {
    const users = await User.find({ createdAt: new Date() });
    return res.json({ users });
  } catch (error) {
    res.status(500).json({ error });
  }
}

module.exports = { getUsersForToday };