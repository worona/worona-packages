import installVendorPackages from '../src/install-vendor-packages.js';
import packageJson from '../package.json';

const start = async () => {
  await installVendorPackages({ service: 'dashboard', packageJson });
};

process.on('unhandledRejection', (err) => {
  console.log(err.stack);
  process.exit(1);
});

start();
