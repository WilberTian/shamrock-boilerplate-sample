import Listr from 'listr';
import sleep from '../lib/sleep';

const copyFiles = async (ctx) => {
    const {
        shamrockUtils,
    } = ctx;

    const files = [
        'scripts',
        'src',
        '.babelrc',
        '.npmrc',
        '.gitignore',
        'CHANGELOG.md',
        'yarn.lock',
    ];
    await sleep(1000);
    await shamrockUtils.copyFiles(files);
};

const updatePackageJSON = async (ctx) => {
    const {
        shamrockUtils,
    } = ctx;

    const filename = 'package.json';

    await sleep(1000);
    await shamrockUtils.updateJson(filename, (data) => {
        return {
            ...data,
            name: `${__dirname}`
        };
    });
};

const updateREADME = async (ctx) => {
    const {
        shamrockUtils,
    } = ctx;

    const filename = 'README.md';

    await sleep(1000);
    await shamrockUtils.updateFile(filename, (data) => {
        return data
            .split('----------')[1]
            .replace(/<project>/g, `${__dirname}`);
    });
};

const createCHANGELOG = async (ctx) => {
    const {
        shamrockUtils,
    } = ctx;
    const filename = 'CHANGELOG.md';

    await sleep(1000);
    await shamrockUtils.writeFile(filename, '');
};

const getShamrockTasks = () => {
    return new Listr([
        {
            title: 'Copy files',
            task: copyFiles,
        },
        {
            title: 'Generate package.json',
            task: updatePackageJSON,
        },
        {
            title: 'Generate README.md',
            task: updateREADME,
        },
        {
            title: 'Generate CHANGELOG.md',
            task: createCHANGELOG,
        }
    ]);
};

export default getShamrockTasks;