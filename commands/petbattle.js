const User = require('../models/User');
const { petPower, petLevel } = require('../utils/petSystem');

module.exports = {
  name:"petbattle",
  async execute(msg){
    let u = await User.findOne({userId:msg.author.id});
    if(!u.pets.length) return msg.reply("No pet!");

    let p = u.pets[0];
    let enemy = Math.random()*100;

    if(petPower(p)>enemy){
      p.exp+=20;
      msg.reply("🐉 Menang!");
    } else msg.reply("💀 Kalah!");

    petLevel(p);
    await u.save();
  }
};