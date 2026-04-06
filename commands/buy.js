const User = require('../models/User');

module.exports = {
    name: "buy",
    async execute(msg, args) {
        let user = await User.findOne({ userId: msg.author.id });

        const item = args[0];

        if (item === "potion") {
            if (user.coin < 100) return msg.reply("Kurang coin");
            user.coin -= 100;
            user.inventory.push("Potion");
        }

        if (item === "sword") {
            if (user.coin < 500) return msg.reply("Kurang coin");
            user.coin -= 500;
            user.inventory.push("Sword");
        }

        await user.save();
        msg.reply("Berhasil beli");
    }
};