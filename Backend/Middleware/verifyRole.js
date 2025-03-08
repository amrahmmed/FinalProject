const { User } = require("../models");
const verifyRole = (roles = []) => {
  return async (req, res, next) => {
    try {
      console.log("User in verifyRole:", req.user); // 🔍 Debugging log

      const userId = req.user.id;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(403).json({ message: "User not found" });
      }

      console.log(`Required roles: ${roles}, User role: ${user.role}`); // 🔍 Check role

      if (!roles.includes(user.role)) {
        return res.status(403).json({ message: "Access denied" });
      }

      next();
    } catch (err) {
      console.error("Error in verifyRole:", err);
      res.status(500).json({ message: "Server error" });
    }
  };
};
module.exports = verifyRole;
