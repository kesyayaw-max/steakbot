const User = require('../models/User');

module.exports = {
    name: "rank",
    async execute(msg) {
        let user = await User.findOne({ userId: msg.author.id });
        msg.reply(`Level ${user.level} | EXP ${user.exp}`);
    }
};