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
const directoryPath = './terraform/proxy';

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
    const fileName = proxyName+'.zip';
    if (matches.length === 0) {
        console.log(`ERROR: No proxy by name ${proxyName} currently deployed to environment ${apigeeEnvironment}`);
    }
    //var proxyZip = run(`apigeetool fetchproxy ${apigeeCliCreds} -n ${proxyName} -r ${proxyRevision}`);


    const command = `apigeetool fetchproxy ${apigee_cli_creds} -n ${name} -r ${revision}`;
    const options = {shell: true};

    const download = exec(command, options);

    download.on('exit', (code) => {
      console.log(`Command exited with code ${code}`);
    });

    download.on('error', (err) => {
      console.error(`Command execution failed: ${err}`);
    });
    // console.log(liveDeployments.deployments)
    fs.writeFile(fileName, download, (error) => {
      if (error) {
        console.error(`Error writing file: ${error}`);
        return;
      }
    });
    // console.log(proxyZip)
    // fs.mkdir(directoryPath, { recursive: true }, (error) => {
    //     if (error) {
    //       console.error(`Error creating directory: ${error}`);
    //       return;
    //     }
        
    //   });
    console.log('Hello World');
    console.log(process.env.PROXY_NAME);
}

sync();
