const fs = require('fs');
const path = require('path');
const util = require("util");
const { exec } = require("child_process");
const { execSync } = require("child_process");
const execProm = util.promisify(exec);
const zlib = require('zlib');


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
  // console.log(apigeeUser);
  console.log("About to make directory");
  let contents = fs.readFileSync('./example.txt', 'utf-8')
  var files = fs.readdirSync('./terraform/proxy')
  console.log(files);
  console.log(contents);
  const liveDeployments = JSON.parse(run(`apigeetool listdeployments ${apigeeCliCreds} -e ${apigeeEnvironment} -j`));
  const matches = liveDeployments.deployments.filter((cdict) => cdict.name === proxyName);
  const fileName = proxyName;
  if (matches.length === 0) {
    console.log(`ERROR: No proxy by name ${proxyName} currently deployed to environment ${apigeeEnvironment}`);
  }
  var proxyZip = run(`apigeetool fetchproxy ${apigeeCliCreds} -n ${proxyName} -r ${proxyRevision}`);

  fs.writeFile(fileName, proxyZip, (error) => {
    if (error) {
      console.error(`Error writing file: ${error}`);
      return;
    }
  });
  console.log(proxyZip)
}

sync();
