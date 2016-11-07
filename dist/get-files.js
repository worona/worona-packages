'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _mkdirp = require('mkdirp');

var _fs = require('fs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(_ref2) {
    var service = _ref2.service,
        env = _ref2.env;
    var path, manifest, core;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            path = 'node_modules/.worona/' + service + '/' + env;

            (0, _mkdirp.sync)(path);
            console.log('Downloading the needed files... please wait.');
            _context.next = 5;
            return (0, _superagent2.default)('https://cdn.worona.io/packages/dist/vendors-' + service + '-worona/' + service + '/' + env + '/json/manifest.json');

          case 5:
            manifest = _context.sent;

            (0, _fs.writeFileSync)(path + '/vendors-manifest.json', JSON.stringify(manifest.body, null, 2));
            _context.next = 9;
            return (0, _superagent2.default)('https://cdn.worona.io/api/v1/settings/package-development/' + service);

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

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();