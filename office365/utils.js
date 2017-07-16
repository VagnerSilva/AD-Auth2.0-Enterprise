'use strict';

const credential = require('./credentials');

function getProxy() {
 // Setting behind proxy
  const proxy = credential.proxy;
  let proxyUrl;
  if (proxy) {
    const user = proxy.user;
    const password = proxy.pass;
    const proxyHost = proxy.host;
    const proxyPort = proxy.port;
    user && password ?
    proxyUrl = 'http://' + new Buffer(user + ':' + password) + '@' + proxyHost + ':' + proxyPort :
    proxyUrl = 'http://' + proxyHost + ':' + proxyPort;
  }
  return proxyUrl;
}

module.exports = getProxy;
