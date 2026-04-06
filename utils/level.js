function checkLevelUp(user) {
    const needed = user.level * 100;

    if (user.exp >= needed) {
        user.level++;
        user.exp = 0;
        return true;
    }
    return false;
}

module.exports = { checkLevelUp };