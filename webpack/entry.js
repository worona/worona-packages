require('babel-polyfill');
var pkg = require('../../../src/dashboard');
var pkgJson = require('../../../package.json');
var packageDevelopment = require('worona-deps').packageDevelopment;

packageDevelopment(Object.assign(pkg, {
  name: pkgJson.name,
  namespace: pkgJson.worona.namespace,
  woronaInfo: {
    name: pkgJson.name,
    id: pkgJson.name,
    namespace: pkgJson.worona.namespace,
    niceName: pkgJson.worona.niceName,
    type: pkgJson.worona.type,
    menu: {
      category: 'Development',
      order: 10,
    },
    services: pkgJson.worona.services,
  }
}));

console.log('Development package ' + pkgJson.name + ' loaded!');
