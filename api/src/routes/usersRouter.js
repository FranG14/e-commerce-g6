const server = require("express").Router();
//---------------------------------------------------------------//
const {
    register,
    login,
    googleLogin,
    getUsers,
    updateUser,
    deleteUser,
    toggleAdmin,
    getUserById,
    changePassword
} = require("../controllers/userController");

//-------------------------Route Users--------------------------//
server.get('/', getUsers);
server.get('/:_id', getUserById);

server.post('/login', login);
server.post('/register', register);
server.post('/google', googleLogin);

server.put('/:_id', updateUser);
server.put('/toggle/:_id', toggleAdmin);
server.put('/password/:_id', changePassword);

server.delete('/:_id', deleteUser);
//-------------------------------------------------------------//
module.exports = server;