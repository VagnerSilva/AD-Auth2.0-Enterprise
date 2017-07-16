'use strict'

const me = require('./profile/me');
const details = require('./profile/users');
const photo = require('./profile/photo');
const async = require('async');

/**
 * @param {String} tokenAccess
 * @param {callback} done
 */
module.exports = (tokenAccess, done) => {
  async.waterfall([
    async.apply(me, tokenAccess),
    details,
    photo,
  ], (err, result) => {
    done(result);
  });
};
