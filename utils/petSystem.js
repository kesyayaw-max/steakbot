function petPower(pet) {
  const base = {
    Common: 10,
    Uncommon: 20,
    Rare: 40,
    Legendary: 70
  };
  return base[pet.rarity] + pet.level * 5;
}

function petLevel(pet) {
  if (pet.exp >= 50) {
    pet.level++;
    pet.exp = 0;
    return true;
  }
  return false;
}

module.exports = { petPower, petLevel };