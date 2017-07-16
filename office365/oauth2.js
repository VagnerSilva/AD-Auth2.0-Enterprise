'use strict';

// const OAuth = require('oauth').OAuth2;
// const uuid = require('node-uuid');
const credentials = require('./credentials');
const jwt = require('../config/jwt');
const request = require('request');
const _proxy = require('./utils');
const Err = require('../controllers/errors/index');


function URL(nonceCode, stateCode) {
  return credentials.identityMetadata + credentials.authorize_endpoint +
    '?client_id=' + credentials.clientID +
    '&client_secret=' + credentials.clientSecret +
    '&response_type=' + credentials.responseType +
    '&redirect_uri=' + credentials.redirectUrl +
    '&response_mode=' + credentials.responseMode +
    '&scope=' + credentials.scope +
    '&nonce=' + nonceCode + // security
    '&state=' + stateCode; // security
}


const OAuth2 = function (credential) {
  this._credential = credential;
};

OAuth2.prototype.getToken = function (code, done) {
  const credential = this._credential;

  const method = {
    url: credential.identityMetadata + credential.token_endpoint,
    form: {
      code: code,
      grant_type: credential.grantTypeAuth,
      redirect_uri: credential.redirectUrl,
      client_id: credential.clientID,
      client_secret: credential.clientSecret
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };
 // Setting for proxy use
  const proxy = credential.proxy;
  const proxyUrl = _proxy();
  if (proxy) {
    method.proxy = proxyUrl;
  }

  request.post(method, (error, res) => {
    try {
      const data = JSON.parse(res.body);
      const accessToken = data.access_token;
      const jwtClaims = jwt.getPayload(accessToken);
      const refreshToken = data.refresh_token;
      done(error, accessToken, jwtClaims, refreshToken);
    } catch (err) {
      // remove proxy configuration.
      done(new Err('Server 500', '500', 'O365-oath 60', 'Erro no servidor contate o administrador.'));
    }
  });
};

function getTokenCode(code, callback) {
  const oauth2 = new OAuth2(credentials);
  oauth2.getToken(code, function (error, accessToken, jwtClaims) {
    callback(error, accessToken, jwtClaims);
  });
}


exports.getURL = URL;
exports.getTokenCode = getTokenCode;
