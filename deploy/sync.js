const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

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
    console.log(apigeeUser);
    fs.mkdir(path.join('./proxies/', proxyName), (err) => {
        if (err) {
            return console.error(err);
        }
        console.log('Directory created successfully!');
    });
    const liveDeployments = JSON.parse(run(`apigeetool listdeployments ${apigeeCliCreds} -e ${apigeeEnvironment} -j`));
    const matches = liveDeployments.deployments.filter((cdict) => cdict.name === proxyName);
    console.log(liveDeployments.deployments)
    if (matches.length === 0) {
        console.log(`ERROR: No proxy by name ${proxyName} currently deployed to environment ${apigeeEnvironment}`);
    }

    console.log('Hello World');
    console.log(process.env.PROXY_NAME);
}

sync();
