const core = require('@actions/core');
const github = require('@actions/github')
const JiraApi = require('jira-client')

try {
    const issueNumber = process.env.RELEASE_TICKET

    if (!issueNumber) {
        return core.setFailed('No issue number found. Assuming not ready.');
    }

    console.log(`Issue number found: ${issueNumber}`)
    core.setOutput("issueNumber", issueNumber);

    let jira = new JiraApi({
        protocol: 'https',
        host: process.env.JIRA_BASE_URL,
        username: process.env.JIRA_USER_EMAIL,
        password: process.env.JIRA_API_TOKEN,
        apiVersion: '2',
        strictSSL: true
    });

    jira.findIssue(issueNumber)
        .then(issue => {
            const statusFound = issue.fields.status.name;
            console.log(`Status: ${statusFound}`);
            core.setOutput("status", statusFound);
        })
        .catch(err => {
            console.error(err);
            core.setFailed(error.message);
        });
} catch (error) {
    core.setFailed(error.message);
}