// Importing growtopia api
const API = require("growtopia-api");
const items = require("../items.json");
const cmd = require("../router/registered");
const { addCommand } = require("../router/registered");

// Regist cmd
addCommand("search", async (data) => {
    try {
        if (data && data.hasOwnProperty('name')) {
            const name = data.name;

            if (name.length < 3) {
                throw new Error("Minimum 3 char name!");
            }
            return items.items.length;
            const results = await API.searchItem(name);

            results.forEach(item => {
                const foundItem = items.items.find(i => i.name.toLowerCase() ==
                item.itemName.toLowerCase());
                if (foundItem) {
                    item.id = foundItem.id
                }
            });

            return (results.length ? results : { "System": "Item not found!" });
        } else {
            throw new Error("Error processing '/search': Invalid data!");
        }
    } catch (error) {
        return {"System": `Error processing '/search': ${error.message}`};
    }
});