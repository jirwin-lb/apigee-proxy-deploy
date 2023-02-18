const { execSync } = require('child_process');
const { readFileSync } = require('fs');

const apigeeUser = process.env.APIGEE_USER;
const apigeePassword = process.env.APIGEE_PASSWORD;
const apigeeOrganization = process.env.APIGEE_ORGANIZATION;
const apigeeEnvironment = process.env.APIGEE_ENVIRONMENT;
const bundlesPath = process.env.LBX_APIGEE_TOOLS_BUNDLES_PATH || './bundles';
const apigeeCliCreds = `-u ${apigeeUser} -p ${apigeePassword} -o ${apigeeOrganization}`;
const proxyName = process.env.PROXY_NAME;
const proxyRevision = process.env.PROXY_REVISION;

function run(cmd) {
  return execSync(cmd, { encoding: 'utf8' });
}

function sync() {
  const liveDeployments = JSON.parse(run(`apigeetool listdeployments ${apigeeCliCreds} -e ${apigeeEnvironment} -j`));
  const matches = liveDeployments.deployments.filter((cdict) => cdict.name === proxyName);

  if (matches.length === 0) {
    console.log(`ERROR: No proxy by name ${proxyName} currently deployed to environment ${apigeeEnvironment}`);
  }

  console.log('Hello World');
  console.log(process.env.PROXY_NAME);
}

sync();
