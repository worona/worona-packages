'use strict';

require('babel-polyfill');
var pkg = require('../src/dashboard').default;
var packageDevelopment = require('worona-deps').packageDevelopment;

packageDevelopment(pkg);

console.log('Development package loaded!');
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTemporaryFiles = undefined;

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _mkdirp = require('mkdirp');

var _fs = require('fs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getTemporaryFiles = exports.getTemporaryFiles = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(_ref2) {
    var entrie = _ref2.entrie,
        env = _ref2.env;
    var path, manifest, core;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            path = 'node_modules/.worona/' + entrie + '/' + env;

            (0, _mkdirp.sync)(path);
            console.log('Downloading the needed files... please wait.');
            _context.next = 5;
            return (0, _superagent2.default)('https://cdn.worona.io/packages/dist/vendors-' + entrie + '-worona/' + entrie + '/' + env + '/json/manifest.json');

          case 5:
            manifest = _context.sent;

            (0, _fs.writeFileSync)(path + '/vendors-manifest.json', JSON.stringify(manifest.body, null, 2));
            _context.next = 9;
            return (0, _superagent2.default)('https://cdn.worona.io/api/v1/settings/package-development/' + entrie);

          case 9:
            core = _context.sent;

            (0, _fs.writeFileSync)(path + '/core-files.json', JSON.stringify(core.body, null, 2));
            console.log('Downloading finished.\n');

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getTemporaryFiles(_x) {
    return _ref.apply(this, arguments);
  };
}();
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.askForWoronaInfo = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _semver = require('semver');

var _semver2 = _interopRequireDefault(_semver);

var _fs = require('fs');

var _urlRegexp = require('url-regexp');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var askForWoronaInfo = exports.askForWoronaInfo = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(_ref2) {
    var packageJson = _ref2.packageJson;

    var npmValues, worona, _ref3, namespace, newPackageJson;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log('\n');
            _context.next = 3;
            return _inquirer2.default.prompt([{
              type: 'input',
              name: 'name',
              message: 'Name (like my-package-name):',
              validate: function validate(name) {
                return (/^[a-z0-9-]+$/.test(name) || 'Incorrect format. It should be something like my-package-name.'
                );
              }
            }, {
              type: 'input',
              name: 'version',
              message: 'Version:',
              default: function _default() {
                return '1.0.0';
              },
              validate: function validate(version) {
                return !!_semver2.default.valid(version) || 'Incorrect version format.';
              }
            }, {
              type: 'input',
              name: 'description',
              message: 'Description:',
              validate: function validate(name) {
                return (/^[\w\s]+$/.test(name) || 'Incorrect format. Use only letters or spaces.'
                );
              }
            }, {
              type: 'input',
              name: 'repository',
              message: 'Git repository (like https://github.com/user/repo):',
              validate: function validate(url) {
                return url === '' || (0, _urlRegexp.validate)(url) || 'Incorrect format. Enter a url or nothing at all.';
              }
            }, {
              type: 'input',
              name: 'keywords',
              message: 'Keywords (comma separated list):',
              filter: function filter(keywords) {
                return keywords.split(',').map(function (kw) {
                  return kw.replace(', ', ',');
                }).map(function (kw) {
                  return kw.replace(/(^\s|\s$)/g, '');
                }).filter(function (kw) {
                  return kw !== '';
                }).concat(['worona', 'package']);
              },
              validate: function validate(keywords) {
                return keywords.reduce(function (prev, kw) {
                  return (/^[a-z0-9\s]*$/.test(kw) && prev
                  );
                }, true) || 'Incorrect format. Keywords should be made only of letters and numbers';
              }
            }, {
              type: 'input',
              name: 'author',
              message: 'Author:'
            }, {
              type: 'input',
              name: 'license',
              message: 'License:',
              default: function _default() {
                return 'MIT';
              }
            }]);

          case 3:
            npmValues = _context.sent;
            _context.next = 6;
            return _inquirer2.default.prompt([{
              type: 'input',
              name: 'niceName',
              message: 'Nice name (like My Package Name):',
              validate: function validate(name) {
                return (/^[\w\s]+$/.test(name) || 'Incorrect format. Use only letters or spaces.'
                );
              }
            }, {
              type: 'input',
              name: 'slug',
              message: 'Slug (like MyPackageName):',
              validate: function validate(name) {
                return (/^[a-zA-Z0-9]+$/.test(name) || 'Incorrect format. Slug should be in camelcase.'
                );
              }
            }, {
              type: 'list',
              name: 'type',
              choices: ['extension', 'theme'],
              message: 'Type:'
            }, {
              type: 'list',
              name: 'service',
              choices: ['dashboard', 'app'],
              message: 'Service:'
            }]);

          case 6:
            worona = _context.sent;

            worona.namespace = 'theme';

            if (!(worona.type !== 'theme')) {
              _context.next = 14;
              break;
            }

            _context.next = 11;
            return _inquirer2.default.prompt([{
              type: 'input',
              name: 'namespace',
              message: 'Namespace:',
              validate: function validate(name) {
                return (/^[a-zA-Z0-9]+$/.test(name) || 'Incorrect format. Namespace should be in camelcase.'
                );
              }
            }]);

          case 11:
            _ref3 = _context.sent;
            namespace = _ref3.namespace;

            worona.namespace = namespace;

          case 14:
            worona.default = false;
            worona.core = false;
            worona.listed = true;
            worona.deactivable = true;
            worona.public = true;
            worona.authors = [npmValues.author];

            newPackageJson = _extends({}, packageJson, npmValues, { worona: worona, repository: { type: 'git', url: 'git+ssh://git@' + npmValues.repository } });


            (0, _fs.writeFileSync)('package.json', JSON.stringify(newPackageJson, null, 2));
            console.log('\n');
            return _context.abrupt('return', worona);

          case 24:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function askForWoronaInfo(_x) {
    return _ref.apply(this, arguments);
  };
}();
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _yargs = require('yargs');

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

var _inquire = require('./inquire.js');

var _files = require('./files.js');

var _webpack = require('./webpack.js');

var _webpack2 = _interopRequireDefault(_webpack);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var start = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var env, location, worona;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            env = _yargs.argv.env || 'dev';
            location = _yargs.argv.location || 'remote';
            _context.t0 = _package2.default.worona;

            if (_context.t0) {
              _context.next = 7;
              break;
            }

            _context.next = 6;
            return (0, _inquire.askForWoronaInfo)({ packageJson: _package2.default });

          case 6:
            _context.t0 = _context.sent;

          case 7:
            worona = _context.t0;
            _context.next = 10;
            return (0, _files.getTemporaryFiles)({ entrie: worona.service, env: env });

          case 10:
            _context.next = 12;
            return (0, _webpack2.default)(_extends({}, worona, { env: env, location: location }));

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function start() {
    return _ref.apply(this, arguments);
  };
}();

process.on('unhandledRejection', function (err) {
  console.log(err.stack);
  process.exit(1);
});

start();
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _childProcessPromise = require('child-process-promise');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(config) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _childProcessPromise.spawn)('./node_modules/.bin/webpack-dev-server', ['--config', 'worona-packages/webpack.config.js', '--name', 'core-dashboard-worona', '--entrie', 'dashboard', '--env', config.env, '--location', config.location], { stdio: 'inherit' });

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();
