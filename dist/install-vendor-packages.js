'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPackageVersion = undefined;

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _childProcessPromise = require('child-process-promise');

var _semver = require('semver');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getPackageVersion = exports.getPackageVersion = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(name) {
    var res;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _superagent2.default)('https://registry.npmjs.org/' + name);

          case 2:
            res = _context.sent;
            return _context.abrupt('return', res.body['dist-tags'].latest);

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getPackageVersion(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(_ref3) {
    var service = _ref3.service,
        packageJson = _ref3.packageJson;
    var remoteVersion, localVersion;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log('\nChecking if new packages for ' + service + ' are needed...');
            _context2.next = 3;
            return getPackageVersion('core-' + service + '-worona');

          case 3:
            remoteVersion = _context2.sent;
            localVersion = packageJson.devDependencies['core-' + service + '-worona'] || '0.0.0';

            if (!(0, _semver.gt)(remoteVersion, localVersion)) {
              _context2.next = 12;
              break;
            }

            console.log('Updating packages for ' + service + '...');
            _context2.next = 9;
            return (0, _childProcessPromise.spawn)('npm', ['install', '--save-dev', '--save-exact', 'core-' + service + '-worona'], { stdio: 'inherit' });

          case 9:
            console.log('Updating finished.\n');
            _context2.next = 13;
            break;

          case 12:
            console.log('Everything is fine.\n');

          case 13:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}();