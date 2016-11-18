'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPackageVersion = undefined;

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

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