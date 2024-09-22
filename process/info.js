// Importing growtopia api
const API = require("growtopia-api");
const items = require("../items.json");
const { addCommand } = require("../router/registered");

// Regis command
addCommand('info', async (data) => {
    try {
        if (data && data.hasOwnProperty('id')) {
            const id = data.id;

            if (id >= items.items.length || id < 0) {
                throw new Error(`Invalid ItemID!`);
            }

            const itemName = items.items[id].name;
            const info = await API.itemInfo(itemName);
            return (info ? info : {"System": "Item not found!"});
        } else {
            throw new Error(`Invalid data!`);
        }
    } catch (error) {
        return {"System": `Error processing '/info': ${error.message}`};
    }
});