const { addCommand } = require("../router/registered");

addCommand("render", async (data) => {
    try {
        data = data[0];
        if (!data.buffer) {
            throw new Error("No buffer provided.");
        }

        return data.buffer.toString('utf-8');
    } catch (error) {
        return { "System": `Error processing JSON: ${error.message}` };
    }
});