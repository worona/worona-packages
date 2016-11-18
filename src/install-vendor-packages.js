import request from 'superagent';
import { spawn } from 'child-process-promise';
import { gt } from 'semver';

export const getPackageVersion = async (name) => {
  const res = await request(`https://registry.npmjs.org/${name}`);
  return res.body['dist-tags'].latest;
};

export default async ({ service, packageJson }) => {
  console.log(`\nChecking if new packages for ${service} are needed...`);
  const remoteVersion = await getPackageVersion(`core-${service}-worona`);
  const localVersion = packageJson.devDependencies[`core-${service}-worona`] || '0.0.0';
  if (gt(remoteVersion, localVersion)) {
    console.log(`Updating packages for ${service}...`);
    await spawn('npm', ['install', '--save-dev', '--save-exact', `core-${service}-worona`],
      { stdio: 'inherit' });
    console.log(`Updating finished.\n`);
  } else {
    console.log(`Everything is fine.\n`);
  }
};
