import inquirer from 'inquirer';

export default async ({ services }) => {
  const { service } = services.length === 1 ? { service: services[0] } : await inquirer.prompt([{
    type: 'list',
    name: 'service',
    message: 'Which service do you want to start?',
    choices: services,
  }]);
  console.log('\n');
  return service;
};
