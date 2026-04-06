const User = require('../models/User');

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

module.exports = {
  name: "coinflip",
  async execute(msg, args) {
    let user = await User.findOne({ userId: msg.author.id });

    const bet = parseInt(args[0]);
    const choice = args[1];

    if (!bet || !choice) return msg.reply("!coinflip <jumlah> <heads/tails>");
    if (user.coin < bet) return msg.reply("Coin kurang!");

    const m = await msg.reply("🪙 Melempar koin...");

    const anim = ["🪙","🔄","🪙","🔄"];
    for (let i = 0; i < anim.length; i++) {
      await m.edit(anim[i]);
      await sleep(500);
    }

    const result = Math.random() > 0.5 ? "heads" : "tails";

    if (choice === result) {
      user.coin += bet;
      await m.edit(`🎉 ${result} → MENANG +${bet}`);
    } else {
      user.coin -= bet;
      await m.edit(`💀 ${result} → KALAH -${bet}`);
    }

    await user.save();
  }
};