const { User } = require('../db');
const express = require('express');
const router = express.Router();

// Middleware para manejar errores en los endpoints


router.get('/sendAllUsers', async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.send(users);
    } catch (err) {
        next(err);
    }
});

router.get('/sendUsByName/:name', async (req, res, next) => {
    const name = req.params.name;
    try {
        const user = await User.findAll({
            where: {
                name: name
            }
        });
        res.send(user);
    } catch (err) {
        next(err);
    }
});
router.put('/setUsName/:id', async (req, res, next) => { 
    const { name, pass } = req.body; 
    const userId = req.params.id; 
    try { 
        const result = await User.update({ name: name, password: pass }, 
            { where: { id: userId } }); 
            res.send(result); 
        } catch (err) { 
            next(err); } });


router.delete('/deleteUser/:name', async (req, res, next) => {
    const name = req.params.name;
    try {
        const result = await User.destroy({
            where: {
                name: name
            }
        });
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.post('/createUser', async (req, res, next) => {
    const { name, pass } = req.body;
    try {
        const user = await User.create({
            name: name,
            password: pass
        });
        res.send(user);
    } catch (err) {
        next(err);
    }
});

// Agregar middleware para manejar errores


module.exports = router;