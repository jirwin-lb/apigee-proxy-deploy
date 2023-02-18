from typing import List, Optional
import os
import json
import subprocess
import shutil
import xml.etree.ElementTree as ElementTree
import sys

import typer


apigee_user=os.environ.get("APIGEE_USER")
apigee_password=os.environ.get("APIGEE_PASSWORD")
apigee_organization=os.environ.get("APIGEE_ORGANIZATION")
apigee_environment=os.environ.get("APIGEE_ENVIRONMENT")
bundles_path=os.environ.get('LBX_APIGEE_TOOLS_BUNDLES_PATH', "./bundles");
apigee_cli_creds=f"-u {apigee_user} -p {apigee_password} -o {apigee_organization}"
proxy_name=get_env_var("PROXY_NAME")
proxy_revision=get_env_var("PROXY_REVISION")

def sync():

    live_deployments = json.loads(run(f"apigeetool listdeployments {apigee_cli_creds} -e {apigee_environment} -j").read())
    matches = list(cdict for cdict in live_deployments["deployments"] if cdict["name"] == name)

    if len(matches) == 0:
        typer.echo(f"ERROR: No proxy by name {name} currently deployed to environment {apigee_environment}")

    print("Hello World")
    print(os.environ.get("PROXY_NAME"))
