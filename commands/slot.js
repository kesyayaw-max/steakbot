const User = require('../models/User');
const { createEmbed } = require('../utils/embed');

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

module.exports = {
  name: "slot",
  async execute(msg, args) {
    let user = await User.findOne({ userId: msg.author.id });

    const bet = parseInt(args[0]);
    if (!bet || user.coin < bet) return msg.reply("❌ Bet salah / coin kurang!");

    const emoji = ["🍒","🍋","🍉","💎"];
    const roll = () => emoji[Math.floor(Math.random()*emoji.length)];

    // 🎬 START ANIMATION
    const m = await msg.reply({
      embeds: [createEmbed("🎰 Slot Machine", "🎲 Memutar...")]
    });

    let a, b, c;

    for (let i = 0; i < 3; i++) {
      a = roll(); b = roll(); c = roll();

      await m.edit({
        embeds: [createEmbed("🎰 Slot Machine",
          `${a} | ${b} | ${c}\n⏳ Spinning...`)]
      });

      await sleep(700); // delay animation
    }

    // 🎯 FINAL RESULT
    a = roll(); b = roll(); c = roll();

    let win = 0;

    if (a === b && b === c) win = bet * 5;
    else if (a === b || b === c) win = bet * 2;

    user.coin += win - bet;
    await user.save();

    // 💥 FINAL REVEAL
    await m.edit({
      embeds: [createEmbed("🎰 HASIL AKHIR",
        `${a} | ${b} | ${c}

${win ? `🎉 MENANG +${win}` : `💀 KALAH -${bet}`}`)]
    });
  }
};