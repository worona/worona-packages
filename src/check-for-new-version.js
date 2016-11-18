import { spawn } from 'child-process-promise';
import { gt } from 'semver';
import { getPackageVersion } from './utils';

export default async ({ packageJson }) => {
  const remoteVersion = await getPackageVersion('worona-packages');
  const localVersion = packageJson.devDependencies['worona-packages'];
  if (gt(remoteVersion, localVersion)) {
    console.log('Updating worona-packages...');
    await spawn('npm', ['install', '--save-dev', '--save-exact', 'worona-packages'],
      { stdio: 'inherit' });
    console.log(`Updating finished.\n`);
  }
};
