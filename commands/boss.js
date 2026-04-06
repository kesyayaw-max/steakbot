const User = require('../models/User');

module.exports = {
  name:"boss",
  async execute(msg){
    let u = await User.findOne({userId:msg.author.id});

    const boss = 200;
    const power = u.level*30;

    if(power>boss){
      u.coin+=500;
      await u.save();
      msg.reply("👑 Boss kalah! +500");
    } else msg.reply("💀 Kalah!");
  }
};