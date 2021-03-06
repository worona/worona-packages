import askForInfo from '../src/ask-for-info.js';

const start = async () => {
  const newPackageJson = await askForInfo({ packageJson: {} });
  console.log(JSON.stringify(newPackageJson, null, 2));
};

process.on('unhandledRejection', (err) => {
  console.log(err.stack);
  process.exit(1);
});

start();
