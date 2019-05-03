const chalk = require("chalk");

const isNotEmptyFor = (name) => {
    return (value) => {
        if (!value || (value && !value.length)) return name + " is required";
        return true;
    }
}

module.exports = function (plop) {

    plop.addHelper("upperCase", (text = "") => text.toUpperCase());

    plop.addHelper("createActionNamespace", (text) => {
        text = text.replace("/", "")

        if (text.length) {
            text = `@@${text.toUpperCase()}`;
        }

        return text;
    });

    plop.setGenerator('component', {
        description: 'Create a component',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'name:',
                validate: isNotEmptyFor("name")
            },
            {
                type: 'list',
                name: 'type',
                message: () => `Which component type?`,
                default: "/",
                choices: [
                    {
                        name: "Component",
                        value: "components",
                    },
                    {
                        name: "Page",
                        value: "pages",
                    }
                ]
            },
            {
                type: 'input',
                name: 'directory',
                message: () => `Directory? ${chalk.gray("(ex. /header/)")}`,
                default: "/",
                validate: isNotEmptyFor("directory")
            },
            {
                type: 'confirm',
                name: 'stateless',
                message: () => `Do you want a stateless component?`,
                default: false,
                when: (answers) => answers.type !== "pages"
            },
            {
                type: 'confirm',
                name: 'withRedux',
                message: () => `Include redux?`,
                default: true,
                when: (answers) => !answers.stateless
            },
            {
                type: 'confirm',
                name: 'withStyledComponents',
                message: () => `Include styled component?`,
                default: true
            },
            {
                type: 'confirm',
                name: 'withTests',
                message: () => `Include tests?`,
                default: true
            },
        ],
        actions: (data) => {
            let actions = [];

            if (data.stateless) {
                actions = [
                    {
                        type: 'add',
                        path: 'src/{{type}}{{directory}}/{{camelCase name}}/{{camelCase name}}.tsx',
                        templateFile: '__templates__/stateless-component.txt',
                        abortOnFail: true
                    }
                ]
            } else {
                actions = [
                    {
                        type: 'add',
                        path: 'src/{{type}}{{directory}}/{{camelCase name}}/{{camelCase name}}Container.ts',
                        templateFile: '__templates__/container.txt',
                        abortOnFail: true
                    }, {
                        type: 'add',
                        path: 'src/{{type}}{{directory}}/{{camelCase name}}/{{camelCase name}}.tsx',
                        templateFile: '__templates__/component.txt',
                        abortOnFail: true
                    }
                ]
            }

            if (data.withStyledComponents) {
                actions.push({
                    type: 'add',
                    path: 'src/{{type}}{{directory}}/{{camelCase name}}/{{camelCase name}}Style.ts',
                    templateFile: '__templates__/styled-component.txt',
                    abortOnFail: true
                })
            }

            if (data.withTests) {
                actions.push({
                    type: `add`,
                    path: `src/__tests__/{{type}}{{directory}}{{camelCase name}}/{{camelCase name}}.test.tsx`,
                    templateFile: `__templates__/test.txt`,
                    abortOnFail: true
                });
            }


            return actions;
        }
    });

    plop.setGenerator('redux-action', {
        description: 'Create a redux action',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'name:',
                validate: isNotEmptyFor("name")
            },
            {
                type: 'input',
                name: 'directory',
                message: () => `Directory? ${chalk.gray("(ex. /header/)")}`,
                default: "/",
                validate: isNotEmptyFor("directory")
            }
        ],
        actions: [
            {
                type: 'add',
                path: 'src/store/actions{{directory}}/{{camelCase name}}.ts',
                templateFile: '__templates__/redux-action.txt',
                abortOnFail: true
            }
        ]
    });
};