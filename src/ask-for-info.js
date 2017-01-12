import inquirer from 'inquirer';
import semver from 'semver';
import colors from 'colors';
import {validate as urlValidate} from 'url-regexp';

const getArrayFromList = list => list
  .split(',')
  .map(item => item.replace(', ', ','))
  .map(item => item.replace(/(^\s|\s$)/g, ''))
  .filter(item => item !== '');

const validateArray = (arr, rgx, msg) => arr.reduce((prev, item) => rgx.test(item) && prev, true) ||
  msg;

const log = msg => console.log(colors.yellow.bold.underline(msg));

export default async ({ packageJson }) => {
  log('\nFirst, let\'s add some general info about the package for Npm:\n');

  const npm = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Npm name (like package-name-app-extesion-worona):',
      filter(name) {
        return name.toLowerCase();
      },
      validate(name) {
        return /^[a-z0-9-]+-worona$/.test(name) ||
          'Incorrect format. It should be something like package-name-app-extesion-worona.';
      },
    },
    {
      type: 'input',
      name: 'description',
      message: 'Npm description:',
      validate(name) {
        return name !== '' || 'Please add a description.';
      },
    },
    {
      type: 'input',
      name: 'version',
      message: 'Version:',
      default() {
        return '1.0.0';
      },
      validate(version) {
        return !!semver.valid(version) || 'Incorrect version format.';
      },
    },
    {
      type: 'input',
      name: 'repository',
      message: 'Git repository (like https://github.com/user/repo):',
      filter(repo) {
        return repo.replace(/\.git$/, '');
      },
      validate(url) {
        return url === '' || urlValidate(url) || 'Incorrect format. Enter a url or nothing at all.';
      },
    },
    {
      type: 'input',
      name: 'keywords',
      message: 'Keywords (comma separated list):',
      filter(keywords) {
        return getArrayFromList(keywords).concat([ 'worona', 'package' ]);
      },
      validate(keywords) {
        return validateArray(keywords, /^[a-z0-9\s]*$/) ||
          'Incorrect format. Keywords should be made only of letters and numbers';
      },
    },
    {
      type: 'input',
      name: 'license',
      message: 'License:',
      default() {
        return 'MIT';
      },
    },
  ]);

  log('\nNow let\'s add some info for Worona:\n');

  const { services, ...worona } = await inquirer.prompt([
    {
      type: 'input',
      name: 'authors',
      message: 'Author emails (comma seperated list):',
      filter(keywords) {
        return getArrayFromList(keywords);
      },
      validate(emails) {
        return emails.length > 0 && validateArray(emails, /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/) ||
          'Emails not valid';
      },
    },
    { type: 'confirm', name: 'private', message: `Is this package private?:`, default: false },
    {
      type: 'checkbox',
      name: 'services',
      choices: [ 'dashboard', 'app', 'fbia', 'amp' ],
      message: 'Choose all the places where the package needs to run. Include dashboard if it needs a config page:\n',
      default() {
        return [ 'dashboard' ];
      },
      validate(services) {
        return services.length > 0 || 'Select at least one service.';
      },
    },
  ]);

  for (const service of services) {
    log(`\nNow let\'s add some info for the '${service}' service:\n`);

    const { type } = await inquirer.prompt([
      {
        type: 'list',
        name: 'type',
        choices: [ 'extension', 'theme' ],
        message: `Type of this package when it's loaded on the '${service}':`,
      },
    ]);

    const { namespace } = type !== 'theme' ? await inquirer.prompt([
        {
          type: 'input',
          name: 'namespace',
          message: `Namespace for this package on the '${service}':`,
          filter(namespace) {
            return namespace.charAt(0).toLowerCase() + namespace.slice(1);
          },
          validate(namespace) {
            return /^[a-zA-Z0-9]+$/.test(namespace) ||
              'Incorrect format. Namespace should be in camelcase.';
          },
        },
      ]) : { namespace: 'theme' };

    let answers;

    if (service !== 'dashboard') {
      answers = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'listed',
          message: `Should this package be listed on the '${service}' repository?:`,
          default: true,
        },
      ]);
      if (answers.listed) {
        const repositoryListingAnswers = await inquirer.prompt([
          {
            type: 'input',
            name: 'niceName',
            message: `The name of this package for the repository of '${service}' packages:`,
            validate(name) {
              return /^[\w\s]+$/.test(name) || 'Incorrect format. Use only letters or spaces.';
            },
          },
          {
            type: 'input',
            name: 'description',
            message: `The description of this package for the repository of '${service}' packages:`,
            validate(description) {
              return description !== '' || 'Please add a description.';
            },
          },
          {
            type: 'input',
            name: 'image',
            message: `The url of the image of this package for the repository of '${service}' packages:`,
            validate(url) {
              return url === '' || urlValidate(url) ||
                'Incorrect format. Enter a url or nothing at all.';
            },
          },
        ]);
        answers = { ...answers, ...repositoryListingAnswers };
      }
    } else {
      answers = await inquirer.prompt([
        {
          type: 'checkbox',
          name: 'tabs',
          choices: [ 'app', 'fbia', 'amp' ],
          message: 'Services where a menu entry should appear:',
          default() {
            return [ 'app' ];
          },
          validate(tabs) {
            return tabs.length > 0 || 'Select at least one service.';
          },
        },
      ]);
    }

    worona[service] = { type, namespace, ...answers };

    if (worona[service].tabs) {
      const menu = {};
      for (const tab of worona[service].tabs) {
        console.log();
        const entry = await inquirer.prompt([
          {
            type: 'input',
            name: 'niceName',
            message: `Name for the menu entry on the '${tab}' tab:`,
            validate(name) {
              return name !== '' || 'Please add a name.';
            },
          },
          {
            type: 'list',
            name: 'category',
            choices: [ 'Settings', 'Themes', 'Extensions', 'Publish' ],
            message: `Category for the menu entry on the '${tab}' tab:`,
          },
          {
            type: 'input',
            name: 'order',
            message: `Order for the menu entry on the '${tab}' tab (between 1 and 100):`,
            default: 10,
            filter(number) {
              return parseInt(number);
            },
            validate(order) {
              const number = parseInt(order);
              return !isNaN(number) && number >= 1 && number <= 100 ||
                'Please enter a number between 1 and 100.';
            },
          },
        ]);
        menu[tab] = entry;
        worona[service].menu = menu;
        delete worona[service].tabs;
      }
    }
  }

  npm.author = worona.authors.join(', ');

  if (npm.repository !== '') {
    npm.bugs = { url: `${npm.repository}/issues` };
    npm.homepage = `${npm.repository}#readme`;
    const repo = /\.git$/.test(npm.repository) ? npm.repository : `${npm.repository}.git`;
    npm.repository = { type: 'git', url: `git+${repo}` };
  }

  console.log('\n');
  return { ...packageJson, ...npm, worona };
}
