'use strict';

/**
 * The tenant can take one of four values:
 * common: Microsoft accounts and work/school accounts.
 * organizations: Allows only users with work/school accounts .
 * consumers: Allows only users with personal Microsoft accounts (MSA) to sign into the application.
 * tivit.onmicrosoft.com: Allows only users with work/school accounts from a particular
 *  Azure Active Directory tenant to sign into the application
 */

const tenant = '';
const version = 'v2.0'; // define version '' to version 1  and v2.0/ to version 2

module.exports = {
  identityMetadata: `https://login.microsoftonline.com/${tenant}`,
  authorize_endpoint: `/oauth2/${version}/authorize`,
  token_endpoint: `/oauth2/${version}/token`,
  redirectUrl: '',
  clientID: '',
  clientSecret: '',
  responseType: ' id_token code',
  responseMode: 'form_post', // form_post Recommended for web applications
  grantTypeAuth: 'authorization_code',
  grantTypeRefreshToken: 'refresh_token',
  scope: 'User.Read Mail.Send Mail.Read User.ReadBasic.All offline_access profile openid',
//   proxy: { // remove if not using proxy connection
//     // user: '', // Network user - Not use @example.com
//    // pass: '', // Network password - Not use password with simbol @
//     // host: '', // host or ip
//     // port: ''
//   }
};
