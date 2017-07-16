'use stric';

const Request = require('request');
const _proxy = require('./utils');

class Graph {

  api() {
    this.host = 'https://graph.microsoft.com/';
    return this;
  }

  /**
   * @param {string} version -Version api 
   */
  version(version) {
    this.version = version;
    return this;
  }

  /**
   * @param {string} uri
   */
  url(uri) {
    this.uri = uri;
    return this;
  }

  select(properties) {
    this.getURL();
    this.host += '?$select=' + properties.join(',');
    return this;
  }

  get(accessToken) {
    this.options = {
      url: this.host,
      headers: {
        Authorization: 'Bearer ' + accessToken
      },
      proxy: _proxy() || ''
    };
    return this.promiseRequest(Request.get(this.options));
  }

  promiseRequest(request) {
    return new Promise((resolve, reject) => {
      request.end((res) => {
        if (res && res.ok) {
          resolve(JSON.parse(res.body));
        } else {
          reject(res);
        }
      });
    });
  }

  getURL() {
    this.host += this.version + '/' +
      this.uri;
    return this;
  }

}


module.exports = new Graph();
