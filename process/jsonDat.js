const { addCommand } = require("../router/registered");

addCommand("jsonDat", async (data) => {
    return JSON.parse(data.buffer.toString("utf-8"));
});