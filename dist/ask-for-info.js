'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _semver = require('semver');

var _semver2 = _interopRequireDefault(_semver);

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

var _urlRegexp = require('url-regexp');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getArrayFromList = function getArrayFromList(list) {
  return list.split(',').map(function (item) {
    return item.replace(', ', ',');
  }).map(function (item) {
    return item.replace(/(^\s|\s$)/g, '');
  }).filter(function (item) {
    return item !== '';
  });
};

var validateArray = function validateArray(arr, rgx, msg) {
  return arr.reduce(function (prev, item) {
    return rgx.test(item) && prev;
  }, true) || msg;
};

var log = function log(msg) {
  return console.log(_colors2.default.yellow.bold.underline(msg));
};

exports.default = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(_ref2) {
    var packageJson = _ref2.packageJson;

    var npm, _ref3, services, worona, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, service, _ref4, type, _ref5, namespace, repositoryQuestions, dashboardQuestions, questions, answers, menu, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, tab, entrie, repo;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            log('\nFirst, let\'s add some general info about the package for Npm:\n');

            _context.next = 3;
            return _inquirer2.default.prompt([{
              type: 'input',
              name: 'name',
              message: 'Npm name (like package-name-app-extesion-worona):',
              filter: function filter(name) {
                return name.toLowerCase();
              },
              validate: function validate(name) {
                return (/^[a-z0-9-]+-worona$/.test(name) || 'Incorrect format. It should be something like package-name-app-extesion-worona.'
                );
              }
            }, {
              type: 'input',
              name: 'description',
              message: 'Npm description:',
              validate: function validate(name) {
                return name !== '' || 'Please add a description.';
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
              name: 'repository',
              message: 'Git repository (like https://github.com/user/repo):',
              filter: function filter(repo) {
                return repo.replace(/\.git$/, '');
              },
              validate: function validate(url) {
                return url === '' || (0, _urlRegexp.validate)(url) || 'Incorrect format. Enter a url or nothing at all.';
              }
            }, {
              type: 'input',
              name: 'keywords',
              message: 'Keywords (comma separated list):',
              filter: function filter(keywords) {
                return getArrayFromList(keywords).concat(['worona', 'package']);
              },
              validate: function validate(keywords) {
                return validateArray(keywords, /^[a-z0-9\s]*$/) || 'Incorrect format. Keywords should be made only of letters and numbers';
              }
            }, {
              type: 'input',
              name: 'license',
              message: 'License:',
              default: function _default() {
                return 'MIT';
              }
            }]);

          case 3:
            npm = _context.sent;


            log('\nNow let\'s add some info for Worona:\n');

            _context.next = 7;
            return _inquirer2.default.prompt([{
              type: 'input',
              name: 'authors',
              message: 'Author emails (comma seperated list):',
              filter: function filter(keywords) {
                return getArrayFromList(keywords);
              },
              validate: function validate(emails) {
                return emails.length > 0 && validateArray(emails, /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/) || 'Emails not valid';
              }
            }, {
              type: 'confirm',
              name: 'private',
              message: 'Is this package private?:',
              default: false
            }, {
              type: 'checkbox',
              name: 'services',
              choices: ['dashboard', 'app', 'fbia', 'amp'],
              message: 'Choose all the places where the package needs to run. Include dashboard if it needs a config page:\n',
              default: function _default() {
                return ['dashboard'];
              },
              validate: function validate(services) {
                return services.length > 0 || 'Select at least one service.';
              }
            }]);

          case 7:
            _ref3 = _context.sent;
            services = _ref3.services;
            worona = _objectWithoutProperties(_ref3, ['services']);
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 13;
            _iterator = services[Symbol.iterator]();

          case 15:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 76;
              break;
            }

            service = _step.value;

            log('\nNow let\'s add some info for the \'' + service + '\' service:\n');

            _context.next = 20;
            return _inquirer2.default.prompt([{
              type: 'list',
              name: 'type',
              choices: ['extension', 'theme'],
              message: 'Type of this package when it\'s loaded on the \'' + service + '\':'
            }]);

          case 20:
            _ref4 = _context.sent;
            type = _ref4.type;

            if (!(type !== 'theme')) {
              _context.next = 28;
              break;
            }

            _context.next = 25;
            return _inquirer2.default.prompt([{
              type: 'input',
              name: 'namespace',
              message: 'Namespace for this package on the \'' + service + '\':',
              filter: function filter(namespace) {
                return namespace.charAt(0).toLowerCase() + namespace.slice(1);
              },
              validate: function validate(namespace) {
                return (/^[a-zA-Z0-9]+$/.test(namespace) || 'Incorrect format. Namespace should be in camelcase.'
                );
              }
            }]);

          case 25:
            _context.t0 = _context.sent;
            _context.next = 29;
            break;

          case 28:
            _context.t0 = { namespace: 'theme' };

          case 29:
            _ref5 = _context.t0;
            namespace = _ref5.namespace;
            repositoryQuestions = [{
              type: 'input',
              name: 'name',
              message: 'The name of this package for the repository of \'' + service + '\' packages:',
              validate: function validate(name) {
                return (/^[\w\s]+$/.test(name) || 'Incorrect format. Use only letters or spaces.'
                );
              }
            }, {
              type: 'input',
              name: 'description',
              message: 'The description of this package for the repository of \'' + service + '\' packages:',
              validate: function validate(description) {
                return description !== '' || 'Please add a description.';
              }
            }, {
              type: 'input',
              name: 'image',
              message: 'The url of the image of this package for the repository of \'' + service + '\' packages:',
              validate: function validate(url) {
                return url === '' || (0, _urlRegexp.validate)(url) || 'Incorrect format. Enter a url or nothing at all.';
              }
            }, {
              type: 'confirm',
              name: 'public',
              message: 'Should this package be listed publicly on the \'' + service + '\' repository?:',
              default: true
            }];
            dashboardQuestions = [{
              type: 'checkbox',
              name: 'tabs',
              choices: ['app', 'fbia', 'amp'],
              message: 'Services where a menu entrie should appear:',
              default: function _default() {
                return ['app'];
              },
              validate: function validate(tabs) {
                return tabs.length > 0 || 'Select at least one service.';
              }
            }];
            questions = [{
              type: 'confirm',
              name: 'default',
              message: 'Should this package be loaded by default on \'' + service + '\'?:',
              default: false
            }];


            if (service !== 'dashboard') questions.push.apply(questions, repositoryQuestions);
            if (service === 'dashboard') questions.push.apply(questions, dashboardQuestions);

            _context.next = 38;
            return _inquirer2.default.prompt(questions);

          case 38:
            answers = _context.sent;


            worona[service] = _extends({ type: type, namespace: namespace }, answers);

            if (!worona[service].tabs) {
              _context.next = 73;
              break;
            }

            menu = {};
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context.prev = 45;
            _iterator2 = worona[service].tabs[Symbol.iterator]();

          case 47:
            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
              _context.next = 59;
              break;
            }

            tab = _step2.value;

            console.log();
            _context.next = 52;
            return _inquirer2.default.prompt([{
              type: 'input',
              name: 'name',
              message: 'Name for the menu entrie on the \'' + tab + '\' tab:',
              validate: function validate(name) {
                return name !== '' || 'Please add a name.';
              }
            }, {
              type: 'list',
              name: 'category',
              choices: ['General', 'Themes', 'Extensions', 'Publish'],
              message: 'Category for the menu entrie on the \'' + tab + '\' tab:'
            }, {
              type: 'input',
              name: 'order',
              message: 'Order for the menu entrie on the \'' + tab + '\' tab (between 1 and 100):',
              default: 10,
              filter: function filter(number) {
                return parseInt(number);
              },
              validate: function validate(order) {
                var number = parseInt(order);
                return !isNaN(number) && number >= 1 && number <= 100 || 'Please enter a number between 1 and 100.';
              }
            }]);

          case 52:
            entrie = _context.sent;

            menu[tab] = entrie;
            worona[service].menu = menu;
            delete worona[service].tabs;

          case 56:
            _iteratorNormalCompletion2 = true;
            _context.next = 47;
            break;

          case 59:
            _context.next = 65;
            break;

          case 61:
            _context.prev = 61;
            _context.t1 = _context['catch'](45);
            _didIteratorError2 = true;
            _iteratorError2 = _context.t1;

          case 65:
            _context.prev = 65;
            _context.prev = 66;

            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }

          case 68:
            _context.prev = 68;

            if (!_didIteratorError2) {
              _context.next = 71;
              break;
            }

            throw _iteratorError2;

          case 71:
            return _context.finish(68);

          case 72:
            return _context.finish(65);

          case 73:
            _iteratorNormalCompletion = true;
            _context.next = 15;
            break;

          case 76:
            _context.next = 82;
            break;

          case 78:
            _context.prev = 78;
            _context.t2 = _context['catch'](13);
            _didIteratorError = true;
            _iteratorError = _context.t2;

          case 82:
            _context.prev = 82;
            _context.prev = 83;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 85:
            _context.prev = 85;

            if (!_didIteratorError) {
              _context.next = 88;
              break;
            }

            throw _iteratorError;

          case 88:
            return _context.finish(85);

          case 89:
            return _context.finish(82);

          case 90:

            npm.author = worona.authors.join(', ');

            if (npm.repository !== '') {
              npm.bugs = { url: npm.repository + '/issues' };
              npm.homepage = npm.repository + '#readme';
              repo = /\.git$/.test(npm.repository) ? npm.repository : npm.repository + '.git';

              npm.repository = { type: 'git', url: 'git+' + repo };
            }

            console.log('\n');
            return _context.abrupt('return', _extends({}, packageJson, npm, { worona: worona }));

          case 94:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[13, 78, 82, 90], [45, 61, 65, 73], [66,, 68, 72], [83,, 85, 89]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();