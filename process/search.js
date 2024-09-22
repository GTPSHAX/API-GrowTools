// Importing growtopia api
const API = require("growtopia-api");
const cmd = require("../router/registered");
<<<<<<< HEAD

// Regist cmd
cmd[0].push(["search", async (data) => {
=======
const { addCommand } = require("../router/registered");

// Regist cmd
addCommand("search", async (data) => {
>>>>>>> 82cc4c9 (Change request system)
    try {
        if (data && data.hasOwnProperty('name')) {
            const name = data.name;

            if (name.length < 3) {
                throw new Error("Minimum 3 char name!");
            }

            const results = await API.searchItem(name);
            return (results.length ? results : {"System": "Item not found!"});
        } else {
            throw new Error("Error processing '/search': Invalid data!");
        }
    } catch (error) {
        return {"System": `Error processing '/search': ${error.message}`};
    }
<<<<<<< HEAD
}]);

module.exports = cmd;
=======
});
>>>>>>> 82cc4c9 (Change request system)
