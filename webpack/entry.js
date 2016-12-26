/* eslint-disable */
require('babel-polyfill');
var pkg = require('../../../src/' + process.env.SERVICE_ENV);
var pkgJson = require('../../../package.json');
var packageDevelopment = require('worona-deps').packageDevelopment;

packageDevelopment(Object.assign(
  pkg,
  { woronaInfo: Object.assign(pkgJson.worona, { name: pkgJson.name }) }
), pkgJson.name, pkgJson.worona.dashboard.namespace);

console.log('Development package ' + pkgJson.name + ' loaded!');
