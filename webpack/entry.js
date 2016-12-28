/* eslint-disable */
var service = process.env.SERVICE_ENV;
require('babel-polyfill');
var pkg = require('../../../src/' + service + '/index.js');
var pkgJson = require('../../../package.json');
var packageDevelopment = require('worona-deps').packageDevelopment;

packageDevelopment(Object.assign(
  pkg,
  { woronaInfo: Object.assign(pkgJson.worona, { name: pkgJson.name }) }
), pkgJson.name, pkgJson.worona[service].namespace);

console.log('Development package ' + pkgJson.name + ' loaded!');
