'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

require('babel-polyfill');

var _yargs = require('yargs');

var _package = require('../../../package.json');

var _package2 = _interopRequireDefault(_package);

var _askForInfo = require('./ask-for-info.js');

var _askForInfo2 = _interopRequireDefault(_askForInfo);

var _getFiles = require('./get-files.js');

var _getFiles2 = _interopRequireDefault(_getFiles);

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
            return (0, _askForInfo2.default)({ packageJson: _package2.default });

          case 6:
            _context.t0 = _context.sent;

          case 7:
            worona = _context.t0;
            _context.next = 10;
            return (0, _getFiles2.default)({ entrie: worona.service, env: env });

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