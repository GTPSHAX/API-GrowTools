const { addCommand } = require("../router/registered");

addCommand("jsonDat", async (data) => {
    try {
        data = data[0];
        if (!data.buffer) {
            throw new Error("No buffer provided.");
        }
        
        const jsonData = JSON.parse(data.buffer.toString("utf-8"));

        return jsonData;
    } catch (error) {
        return { "System": `Error processing JSON: ${error.message}` };
    }
});