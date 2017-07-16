'use strict';


const unirest = require('unirest');
const _proxy = require('../../utils');
const Err = require('../../../controllers/errors/index');
const proxy = _proxy();
let proxyUrl;
if (proxy) {
  proxyUrl = proxy;
}


const host = 'https://graph.microsoft.com/';
const version = 'v1.0';
const param = '/me';
const select = '?$select=displayName,userPrincipalName';
const url = host + version + param + select;

/**
* @param {callback} done
* @param {string} accessToken
* @returns {object} - Return username and email
 */
function getMe(accessToken, done) {
  const Request = unirest.get(url);
  Request.proxy(proxyUrl || '')
  .headers('Authorization', 'Bearer ' + accessToken)
  .end((res) => {
    // const perfil = JSON.parse(res.body);
    try {
      let me = {};
      me.name = res.body.displayName;
      me.email = res.body.userPrincipalName;
      done(null, accessToken, me);
    } catch (error) {
      done(new Err('ServerError',
          500,
          'profile-me-39',
          'Falha de acesso, contate o adminstrador' // adicona no arquivo office365/credentials o proxy
      ));
    }
  });
}
module.exports = getMe;
