const util = require('util');
const fs = require('fs');

const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);

async function read(path) {
    const buffer = await readFilePromise(path);

    return JSON.parse(buffer.toString());
}

async function write(path, data) {
    await writeFilePromise(path, JSON.stringify(data));
}

module.exports = {read, write};