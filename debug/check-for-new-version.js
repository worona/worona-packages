import checkForNewVersion from '../src/check-for-new-version.js';
import packageJson from '../package.json';

const start = async () => {
  await checkForNewVersion({ packageJson });
};

process.on('unhandledRejection', (err) => {
  console.log(err.stack);
  process.exit(1);
});

start();
