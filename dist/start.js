'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

require('babel-polyfill');

var _yargs = require('yargs');

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

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var start = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var env, location, newPackageJson, worona, service;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _checkForNewVersion2.default)({ packageJson: _package2.default });

          case 2:
            if (!_context.sent) {
              _context.next = 6;
              break;
            }

            console.log('Please run `npm start` again.\n\n');
            _context.next = 29;
            break;

          case 6:
            env = _yargs.argv.env || 'dev';
            location = _yargs.argv.location || 'remote';

            if (!_package2.default.worona) {
              _context.next = 12;
              break;
            }

            _context.t0 = _package2.default;
            _context.next = 15;
            break;

          case 12:
            _context.next = 14;
            return (0, _askForInfo2.default)({ packageJson: _package2.default });

          case 14:
            _context.t0 = _context.sent;

          case 15:
            newPackageJson = _context.t0;
            worona = newPackageJson.worona;

            (0, _fs.writeFileSync)('package.json', JSON.stringify(newPackageJson, null, 2));
            _context.next = 20;
            return spawn('npm', ['install'], { stdio: 'inherit' });

          case 20:
            _context.next = 22;
            return (0, _askForService2.default)({ services: worona.services });

          case 22:
            service = _context.sent;
            _context.next = 25;
            return (0, _installVendorPackages2.default)({ service: service, packageJson: newPackageJson });

          case 25:
            _context.next = 27;
            return (0, _getFiles2.default)({ service: service, env: env });

          case 27:
            _context.next = 29;
            return (0, _webpack2.default)(_extends({}, newPackageJson, worona, { env: env, location: location, service: service }));

          case 29:
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