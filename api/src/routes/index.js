const {Router} = require('express');
const userRoute = require('./user');
const gameRoute = require('./apigames');
const genreRoute = require('./genres');
const router = Router();

router.use('/videogame', gameRoute);
router.use('/genre', genreRoute);
router.use('/user', userRoute);
module.exports = router;