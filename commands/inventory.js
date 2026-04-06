const User = require('../models/User');

module.exports = {
    name: "inventory",
    async execute(msg) {
        let user = await User.findOne({ userId: msg.author.id });

        if (!user || user.inventory.length === 0)
            return msg.reply("Kosong!");

        msg.reply(user.inventory.join(", "));
    }
};