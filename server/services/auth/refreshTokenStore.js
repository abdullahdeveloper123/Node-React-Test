// Import core dependencies
const fs = require('fs');
const { get } = require('http');
const path = require('path');

// Define paths for data directory and meetings JSON file
const dataDir = path.join('./data');
const dataFilePath = path.join(dataDir, 'refreshTokens.json');

/**
 * Ensure data directory and refreshTokens.json file exist.
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
 * Retrieve and return all saved Refresh Tokens from refreshToken.json an array.
 */
const getTokens = () => {
    return JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
};

/**
 * Save updated refresh tokens array to meetings.json.
 */
const saveTokens = (refreshToken) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(refreshToken, null, 2));
};

module.exports = { ensureDataFile, getTokens, saveTokens };
