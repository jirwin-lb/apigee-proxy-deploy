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
const directoryPath = './terraform/proxy/' + proxyName;

function run(cmd) {
    return execSync(cmd, { encoding: 'utf8' });
}

function sync() {
    // console.log(apigeeUser);
    console.log("About to make directory");
    let contents = fs.readFileSync('./example.txt', 'utf-8')
    var files = fs.readdirSync('./terraform/proxy/')
    console.log(files);
    console.log(contents);
    const liveDeployments = JSON.parse(run(`apigeetool listdeployments ${apigeeCliCreds} -e ${apigeeEnvironment} -j`));
    const matches = liveDeployments.deployments.filter((cdict) => cdict.name === proxyName);

    const proxyZip = JSON.parse(run(`apigeetool fetchproxy ${apigeeCreds} -n ${proxyName} -r ${proxyRevision}`))
    // console.log(liveDeployments.deployments)
    if (matches.length === 0) {
        console.log(`ERROR: No proxy by name ${proxyName} currently deployed to environment ${apigeeEnvironment}`);
    }
    const filePath = path.join(directoryPath, proxyName,'.zip');

    fs.mkdir(directoryPath, { recursive: true }, (error) => {
        if (error) {
          console.error(`Error creating directory: ${error}`);
          return;
        }
        fs.writeFile(filePath, proxyZip, (error) => {
          if (error) {
            console.error(`Error writing file: ${error}`);
            return;
          }
          console.log(`File ${fileName} written to ${directoryPath}`);
        });
      });
    console.log('Hello World');
    console.log(process.env.PROXY_NAME);
}

sync();
