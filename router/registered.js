<<<<<<< HEAD
const cmd = new Map([]);

module.exports = cmd;
=======
let regisCmd = new Map();

// Regis cmd function
function addCommand(command, handler) {
    regisCmd.set(command, handler);
}

module.exports = {
    regisCmd,
    addCommand
};
>>>>>>> 82cc4c9 (Change request system)
