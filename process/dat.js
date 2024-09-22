const items = require("../items.json");
const { addCommand } = require("../router/registered");

addCommand("dat", async (data) => {
    try {
        if (data && data.hasOwnProperty('id')) {
            const id = data.id;

            if (id < 0 || id > items.item_count) {
                throw new Error(`Invalid ItemID!`);
            }
            
            const result = items.items.find(i => i.item_id === id)

            return (result ? result : {"System": "Item not found!"});
        } else {
            throw new Error(`Invalid data!`);
        }
    } catch (error) {
        return {"System": `Error processing '/info': ${error.message}`};
    }
})