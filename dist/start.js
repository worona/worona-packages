'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

require('babel-polyfill');

var _yargs = require('yargs');

var _childProcessPromise = require('child-process-promise');

var _fs = require('fs');

var _package = require('../../../package.json');

var _package2 = _interopRequireDefault(_package);

var _askForInfo = require('./ask-for-info.js');

var _askForInfo2 = _interopRequireDefault(_askForInfo);

var _askForService = require('./ask-for-service.js');

var _askForService2 = _interopRequireDefault(_askForService);

var _installVendorPackages = require('./install-vendor-packages.js');

var _installVendorPackages2 = _interopRequireDefault(_installVendorPackages);

var _checkForNewVersion = require('./check-for-new-version.js');

var _checkForNewVersion2 = _interopRequireDefault(_checkForNewVersion);

var _getFiles = require('./get-files.js');

var _getFiles2 = _interopRequireDefault(_getFiles);

var _webpack = require('./webpack.js');

var _webpack2 = _interopRequireDefault(_webpack);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /* eslint-disable no-console */


var start = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _checkForNewVersion2.default)({ packageJson: _package2.default });

          case 2:
            if (!_context2.sent) {
              _context2.next = 6;
              break;
            }

            console.log('Please run `npm start` again.\n\n');
            _context2.next = 7;
            break;

          case 6:
            return _context2.delegateYield(regeneratorRuntime.mark(function _callee() {
              var env, location, newPackageJson, worona, services, service;
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      env = _yargs.argv.env || 'dev';
                      location = _yargs.argv.location || 'remote';

                      if (!_package2.default.worona) {
                        _context.next = 6;
                        break;
                      }

                      _context.t0 = _package2.default;
                      _context.next = 9;
                      break;

                    case 6:
                      _context.next = 8;
                      return (0, _askForInfo2.default)({ packageJson: _package2.default });

                    case 8:
                      _context.t0 = _context.sent;

                    case 9:
                      newPackageJson = _context.t0;
                      worona = newPackageJson.worona;
                      services = ['dashboard', 'app', 'amp', 'fbia'].filter(function (service) {
                        return worona[service];
                      });

                      (0, _fs.writeFileSync)('package.json', JSON.stringify(newPackageJson, null, 2));
                      _context.next = 15;
                      return (0, _childProcessPromise.spawn)('npm', ['install'], { stdio: 'inherit' });

                    case 15:
                      _context.next = 17;
                      return (0, _askForService2.default)({ services: services });

                    case 17:
                      service = _context.sent;
                      _context.next = 20;
                      return (0, _installVendorPackages2.default)({ service: service, packageJson: newPackageJson });

                    case 20:
                      _context.next = 22;
                      return (0, _getFiles2.default)({ service: service, env: env });

                    case 22:
                      _context.next = 24;
                      return (0, _webpack2.default)(_extends({}, newPackageJson, worona, { env: env, location: location, service: service }));

                    case 24:
                    case 'end':
                      return _context.stop();
                  }
                }
              }, _callee, undefined);
            })(), 't0', 7);

          case 7:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
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