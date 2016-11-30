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
            return (0, _childProcessPromise.spawn)('./node_modules/.bin/webpack-dev-server', ['--config', 'node_modules/worona-packages/webpack/webpack.config.js', '--progress', '--name', 'core-dashboard-worona', '--service', config.service, '--env', config.env, '--location', config.location], { stdio: 'inherit' });

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