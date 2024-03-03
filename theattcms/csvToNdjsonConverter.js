const csv = require('csvtojson');
const fs = require('fs');
const path = require('path');
const config = require('./config.json'); // Load configuration

function convertTitleToId(title) {
    // Ensure title is a string and replace any non-allowed characters with '-'
    if (typeof title === 'string') {
        return title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    } else {
        console.error('Title is undefined or not a string:', title);
        throw new Error('Invalid title encountered.');
    }
}

async function convertCsvToNdjson(csvPath, ndjsonPath) {
    try {
        const jsonArray = await csv().fromFile(csvPath);

        const ndjson = jsonArray.map(item => {
            if (!item.title) {
                console.warn('Warning: A row with an undefined or empty title was encountered and skipped.');
                return null; // Skip this item
            }

            const documentId = convertTitleToId(item.title);
            return JSON.stringify({
                _type: "tvShow",
                _id: documentId,
                title: item.title,
                rating: item.rating ? parseFloat(item.rating) : null,
                wokeRating: item.wokeRating ? parseInt(item.wokeRating, 10) : null,
                description: item.description,
                wokeComment: item.wokeComment,
                canIBinge: item.canIBinge,
                // Additional fields can be mapped here as needed
            });
        }).filter(Boolean).join('\n'); // Filter out null items

        fs.writeFileSync(ndjsonPath, ndjson);
        console.log(`Conversion complete. NDJSON file saved to: ${ndjsonPath}`);
    } catch (error) {
        console.error('An error occurred during the conversion:', error);
    }
}

// Paths from config
const csvFilePath = path.join(__dirname, config.csvFilePath);
const ndjsonFilePath = path.join(__dirname, config.ndjsonFilePath);

convertCsvToNdjson(csvFilePath, ndjsonFilePath);
