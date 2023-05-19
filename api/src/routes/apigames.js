const express = require('express');
const router = new express.Router();

const {mergeApiDbGames, mergeByNameAPIDB, getGames} = require('../utils/functions/sendGameObj')

router.use(express.json());

router.get('/', async (req, res) => {
    const allgame = await mergeApiDbGames();
    res.json(allgame);
})

router.get('/name', async (req, res) => {
    const name = req.query.name;
    let game = await mergeByNameAPIDB(name);
    res.json(game);
  });

module.exports = router;