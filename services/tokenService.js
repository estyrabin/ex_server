const activeTokens = [];

function addToken(token) {
  if (!token) return;
  if (!activeTokens.includes(token)) activeTokens.push(token);
}

function deleteToken(token) {
  const idx = activeTokens.indexOf(token);
  if (idx !== -1) {
    activeTokens.splice(idx, 1);
    return true;
  }
  return false;
}

function isToken(token) {
  return activeTokens.includes(token);
}

module.exports = { addToken, deleteToken, isToken };
