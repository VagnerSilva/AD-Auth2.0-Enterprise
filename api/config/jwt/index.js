const jwt = require('jsonwebtoken');
const keyGenerator = require('../../../openssl/keyGenerator');
const fs = require('fs');

const code  = Math.random().toString(23).replace(/[^a-z0-9]{23-82}+/g,'').slice(2)
const commands = [
  `openssl genrsa -out private_${code}.pem 3072`,
  `openssl rsa -in private_${code}.pem -outform PEM -pubout -out public${code}.pem`
];

// keyGenerator(commands);

/**
 * @param {Object} payload
 */
function token(payload) {
  //   const pass  = Math.random().toString(23).replace(/[^a-z0-9]{23-82}+/g,'').slice(2)

// generator random primary key
  if (!fs.existsSync('private.pem')) keyGenerator(commands);
  let primary = fs.readFileSync('private.pem', 'utf-8');

  return jwt.sign(payload, primary, {
    algorithm: 'RS512',
    expiresIn: '9h'
  });
}

/**
 * Verify Token.
 * @param {string} [tk=token] - token
 * @returns {Boolean}
 */
function verifyToken(tk) {
  let pub = fs.readFileSync('public.pem', 'utf-8');
  try {
    return jwt.verify(tk, pub);
  } catch (error) {
    return { message: 'Sem permissão! Efetue novamente o login', code: 401 };
  }
}


/**
 * @param {Token} accessToken
 */
function getPayload(accessToken) {
  try {
    return jwt.decode(accessToken);
  } catch (error) {
    return { message: 'Sem permissão! Efetue novamente o login', code: 401 };
  }
}

exports.token = token;
exports.getPayload = getPayload;
exports.verifyToken = verifyToken;
