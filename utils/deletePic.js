const path = require('path');
const fs = require('fs');

module.exports = (filename) => {
    console.log(filename);
    try {
        const filePath = path.join(__dirname, '../uploads/' + filename);
        fs.unlinkSync(filePath);
    }
    catch (err) {
        console.log(`Non sono riuscito ad eliminare l'immagine ${filename}`);
        console.log(err);
    }
}