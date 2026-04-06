const User = require('../models/User');
const { createEmbed } = require('../utils/embed');

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

module.exports = {
  name: "hunt",
  async execute(msg) {
    let user = await User.findOne({ userId: msg.author.id });

    const m = await msg.reply("🌲 Mencari hewan...");

    await sleep(1000);
    await m.edit("👀 Menyusuri hutan...");

    await sleep(1000);
    await m.edit("⚔️ Menangkap...");

    const coin = Math.floor(Math.random()*100)+50;

    user.coin += coin;
    await user.save();

    await sleep(800);
    await m.edit(`🎉 Berhasil! +${coin} coin`);
  }
};