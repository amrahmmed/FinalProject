const { User } = require("../models");

const verifyRole = (roles = []) => {
    return async (req, res, next) => {
        try {
            const userId = req.user.id;
            const user = await User.findById(userId);

            if (!user || !roles.includes(user.role)) {
                return res.status(403).send('Access denied');
            }

            next();
        } catch (err) {
            res.status(500).send('Server error');
        }
    };
};

module.exports = verifyRole;