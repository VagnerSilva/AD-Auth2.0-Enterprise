// get user information

'use strict';

const unirest = require('unirest');
const _proxy = require('../../utils');

const proxy = _proxy();
let proxyUrl;
if (proxy) {
  proxyUrl = proxy;
}


/**
 * @param {string} accessToken
 * @param {object} me
 * @param {callback} done
 * @returns  user information
 */
function users(accessToken, me, done) {
  const Request = unirest.get(`https://graph.microsoft.com/beta/users?$filter=startswith(userPrincipalName, '${me.email}')&$select=displayName,businessPhones,jobTitle,usageLocation,department`);
  Request.proxy(proxyUrl || '')
  .headers('Authorization', 'Bearer ' + accessToken)
  .end((res) => {
    // const perfil = JSON.parse(res.body);


    // get perfil
    let p = res.body.value[0];

 // me.email = p.userPrincipalName;
    me.phone = p.businessPhones;
    me.jobTitle = p.jobTitle;
    me.department = p.department;

    done(null, accessToken, me);
  });
}
module.exports = users;
