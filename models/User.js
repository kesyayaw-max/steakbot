const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: String,
  coin: { type: Number, default: 0 },
  exp: { type: Number, default: 0 },
  level: { type: Number, default: 1 },

  inventory: { type: Object, default: {} },

  pets: [
    {
      name: String,
      rarity: String,
      level: { type: Number, default: 1 },
      exp: { type: Number, default: 0 }
    }
  ],

  lastDaily: { type: Number, default: 0 }
});

module.exports = mongoose.model('User', userSchema);