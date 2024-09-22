// Importing growtopia api
const API = require("growtopia-api");
const cmd = require("../router/registered");
const { addCommand } = require("../router/registered");
let items = require("../items.json");
items = items.items;

// Regist cmd
addCommand("search", async (data) => {
    try {
        if (data && data.hasOwnProperty('name')) {
            const name = data.name;

            if (name.length < 3) {
                throw new Error("Minimum 3 char name!");
            }

            let results = await API.searchItem(name);
            results.forEach(item => {
                const foundItem = items.find(i => i.name === item.name);
                if (foundItem) {
                    item.id = foundItem.id;
                }
            });
            return (results.length ? results : {"System": "Item not found!"});
        } else {
            throw new Error("Error processing '/search': Invalid data!");
        }
    } catch (error) {
        return {"System": `Error processing '/search': ${error.message}`};
    }
});