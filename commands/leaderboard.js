const User = require('../models/User');

module.exports = {
    name: "leaderboard",
    async execute(msg) {
        const top = await User.find().sort({ coin: -1 }).limit(5);

        let text = "🏆 TOP:\n";
        top.forEach((u, i) => {
            text += `${i + 1}. <@${u.userId}> - ${u.coin}\n`;
        });

        msg.reply(text);
    }
};