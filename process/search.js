// Importing growtopia api
const API = require("growtopia-api");
let items = require("../items.json");
items = items.items;
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

            const results = await API.searchItem(name).then(data => {
                data.forEach(a => {
                    const foundItem = items.find(i => i.name.toLowerCase() ==
                    a.itemName.toLowerCase());
                    if (foundItem) {
                        a.id = foundItem.id;
                    }
                });
                return data;
            });
            return (results.length ? results : {"System": "Item not found!"});
        } else {
            throw new Error("Error processing '/search': Invalid data!");
        }
    } catch (error) {
        return {"System": `Error processing '/search': ${error.message}`};
    }
});