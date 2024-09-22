<<<<<<< HEAD
// Importing require liblary
const express = require("express");
// Importing process
const cmd = require("./registered");
=======
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
>>>>>>> 82cc4c9 (Change request system)

// Define main app
const API = express();
API.use(express.urlencoded({ extended: true })); // Parsing data

// Main request handler
API.post("/*", async (req, res) => {
    try {
<<<<<<< HEAD
        const reqData = req.body;  // Getting file from request
        console.log(reqData);
        res.status(200).send(JSON.stringify(cmd,
        null, 2));
        //console.log(process[req.url.split("/")[0]](reqData));
        //res.status(200).send(JSON.stringify(await cmd.get(req.url.split('/')[req.url.split('/').length - 1])(reqData), null, 2))
    } catch (error) {
        return res.status(500).json({ "System": `Error: ${error.message}`});
=======
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
>>>>>>> 82cc4c9 (Change request system)
    }
});

// Export the app
module.exports = API;