import { spawn } from 'child-process-promise';
import { gt } from 'semver';
import { getPackageVersion } from './utils';

export default async ({ packageJson }) => {
  const remoteVersion = await getPackageVersion('worona-packages');
  const localVersion = packageJson.devDependencies['worona-packages'];
  if (gt(remoteVersion, localVersion)) {
    console.log('\nThere is a new version of worona-packages. Updating...');
    await spawn('npm', ['install', '--save-dev', '--save-exact', `worona-packages@${remoteVersion}`],
      { stdio: 'inherit' });
    console.log(`Updating finished.\n`);
    return true;
  }
  return false;
};
