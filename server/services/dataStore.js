// Import core dependencies
const fs = require('fs');
const path = require('path');

// Define paths for data directory and meetings JSON file
const dataDir = path.join('./data');
const dataFilePath = path.join(dataDir, 'meetings.json');

/**
 * Ensure data directory and meetings.json file exist.
 * Creates them if missing.
 */
const ensureDataFile = () => {
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir);
    }
    if (!fs.existsSync(dataFilePath)) {
        fs.writeFileSync(dataFilePath, '[]');
    }
};

/**
 * Retrieve and return all meetings from meetings.json an array.
 */
const getMeetings = () => {
    return JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
};

/**
 * Save updated meetings array to meetings.json.
 */
const saveMeetings = (meeting) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(meeting, null, 2));
};

module.exports = { ensureDataFile, getMeetings, saveMeetings };
