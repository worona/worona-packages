'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _childProcessPromise = require('child-process-promise');

var _semver = require('semver');

var _utils = require('./utils');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(_ref2) {
    var service = _ref2.service,
        packageJson = _ref2.packageJson;
    var remoteVersion, localVersion;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _utils.getPackageVersion)('core-' + service + '-worona');

          case 2:
            remoteVersion = _context.sent;
            localVersion = packageJson.devDependencies['core-' + service + '-worona'] || '0.0.0';

            if (!(0, _semver.gt)(remoteVersion, localVersion)) {
              _context.next = 9;
              break;
            }

            console.log('\nThere is a new version of core-' + service + '-worona. Updating...');
            _context.next = 8;
            return (0, _childProcessPromise.spawn)('npm', ['install', '--save-dev', '--save-exact', 'core-' + service + '-worona'], { stdio: 'inherit' });

          case 8:
            console.log('Updating finished.\n');

          case 9:
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