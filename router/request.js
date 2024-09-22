// Importing required library
const fs = require("fs");
const path = require("path");
const express = require("express");
const { regisCmd } = require("./registered");  // Mengimpor Map regisCmd

// Load whole command
const commandsPath = path.join(__dirname, "../process");
fs.readdirSync(commandsPath).forEach(file => {
    const filePath = path.join(commandsPath, file);
    require(filePath);
});

// Define main app
const API = express();
API.use(express.urlencoded({ extended: true })); // Parsing data

// Main request handler
API.post("/*", async (req, res) => {
    try {
        const reqData = req.body;  // Getting data from request
        const commandKey = req.url.split('/').pop(); // Getting command from URL
        const command = regisCmd.get(commandKey); // Getting command from Map

        if (command) {
            const response = await command(reqData);
            res.status(200).send(JSON.stringify(response, null, 2));
        } else {
            res.status(404).json({"System": "Command not found!"});
        }
    } catch (error) {
        return res.status(500).json({ "System": `Error: ${error.message}` });
    }
});

// Export the app
module.exports = API;