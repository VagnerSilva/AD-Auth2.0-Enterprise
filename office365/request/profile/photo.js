'use strict';

const fs = require('fs');
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
 * @returns User picture in base64
 */
function photo(accessToken, me, done) {
  const Request = unirest.get('https://graph.microsoft.com/v1.0/me/photo/$value');
  Request.proxy(proxyUrl || '')
    .headers({
      Authorization: 'Bearer ' + accessToken
    })
    .encoding('binary')
    .end((res) => {
      if (res.statusCode === 200) {
        let fileName = Math.random() + '.jpg';
        fs.writeFileSync(fileName, res.body, 'binary');
        let bitmap = fs.readFileSync(fileName); // create file
        let imageBase64 = new Buffer(bitmap).toString('base64'); // enconde base64
        fs.unlinkSync(fileName); // delete file
        me.photo = imageBase64;
        done(null, me);
      }
    });
}


module.exports = photo;
