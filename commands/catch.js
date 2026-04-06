const User = require('../models/User');

module.exports = {
  name:"catch",
  async execute(msg){
    let u = await User.findOne({userId:msg.author.id});

    const pets = ["Common","Uncommon","Rare","Legendary"];
    const pick = pets[Math.floor(Math.random()*pets.length)];

    u.pets.push({name:"Pet",rarity:pick});
    await u.save();

    msg.reply(`🐾 Pet ${pick} didapat!`);
  }
};