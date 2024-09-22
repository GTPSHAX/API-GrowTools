let regisCmd = new Map();

// Regis cmd function
function addCommand(command, handler) {
    regisCmd.set(command, handler);
}

module.exports = {
    regisCmd,
    addCommand
};