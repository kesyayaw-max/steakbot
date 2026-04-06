const User = require('../models/User');

module.exports = {
    name: "balance",
    async execute(msg) {
        let user = await User.findOne({ userId: msg.author.id }) || await User.create({ userId: msg.author.id });
        msg.reply(`💰 Coin kamu: ${user.coin}`);
    }
};