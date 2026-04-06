const User = require('../models/User');

module.exports = {
    name: "daily",
    async execute(msg) {
        let user = await User.findOne({ userId: msg.author.id }) || await User.create({ userId: msg.author.id });

        if (Date.now() - user.lastDaily < 86400000)
            return msg.reply("Sudah claim hari ini!");

        user.coin += 200;
        user.lastDaily = Date.now();

        await user.save();
        msg.reply("🎁 +200 coin");
    }
};