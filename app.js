const fs = require('fs');
const path = require('path');

const pathToFolderBoys = path.join(__dirname, 'boys');
const pathToFolderGirls = path.join(__dirname, 'girls');

const filesSort = (firstFolder, gender, secondFolder) => {
    fs.readdir(firstFolder, (err, files) => {
        if (err) {
            console.log(err);
            return;
        }

        files.forEach(fileName => {
            fs.readFile(path.join(firstFolder, fileName), (err, data) => {
                if (err) {
                    console.log(err);
                    return;
                }

                if (JSON.parse(data).gender === gender) {
                    fs.rename(path.join(firstFolder, fileName), path.join(secondFolder, fileName), err => {
                        console.log(err);
                    });
                }
            });
        });
    });
};

filesSort(pathToFolderBoys, "female", pathToFolderGirls);
filesSort(pathToFolderGirls, "male", pathToFolderBoys);
