import prompts from "prompts";
import { execSync } from "child_process";

async function main() {
    const project = await promptProject();
    await bumpVersion(project);
    buildProject(project);
    releaseProject(project);
}

async function prompt(question: Omit<prompts.PromptObject<"value">, "name">): Promise<string> {
    const result = await prompts(
        {
            name: "value",
            ...question,
        },
        {
            onCancel() {
                console.error("Aborting");
                process.exit(-1);
            },
        }
    );

    return result.value;
}

const run = (command: string) => execSync(command, { stdio: [0, 1, 2] });
const simpleChoices = (...args: string[]) => args.map((value) => ({ title: value, value }));

async function promptProject() {
    return prompt({
        type: "select",
        message: "Select the project",
        choices: simpleChoices("dom-helmet", "scatman", "tsx-dom-types", "tsx-dom", "tsx-dom-ssr"),
    });
}

function buildProject(project: string) {
    console.log("Starting build");
    run(`npx nx build ${project} --skip-nx-cache`);
}

function releaseProject(project: string) {
    console.log("Publishing");
    process.chdir(`./dist/packages/${project}`);
    run("npm publish --access public");
}

async function bumpVersion(project: string) {
    const packageFile = `./packages/${project}/package.json`;
    const json = await import(packageFile);
    let [major, minor, patch] = json.version.split(".").map(parseFloat);

    const newVersions = {
        major: `${major + 1}.0.0`,
        minor: `${major}.${minor + 1}.0`,
        patch: `${major}.${minor}.${patch + 1}`,
    };

    const bumpType = await prompt({
        type: "select",
        message: "What increment would you like to perform?",
        choices: [
            ...Object.keys(newVersions).map((value) => ({
                title: `${value}: ${json.version} -> ${newVersions[value as keyof typeof newVersions]}`,
                value,
            })),
            { title: "no increment", value: "" },
        ],
        initial: 1,
    });

    if (bumpType) {
        const newVersion = newVersions[bumpType as keyof typeof newVersions];

        if (!newVersion) {
            throw new Error(`Unexpected change ${bumpType}`);
        }

        // Edit package.json in-place
        console.log(`Changing version of ${project} to ${newVersion}`);
        run(
            `cat <<< $(jq '.version="${newVersion}"' packages/${project}/package.json) > packages/${project}/package.json`
        );
    } else {
        console.log(`No version change performed on ${project}`);
    }
}

main();
