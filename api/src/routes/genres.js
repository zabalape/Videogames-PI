const express = require('express');
const router = new express.Router();

const {getGenres} = require('../utils/functions/sendGameObj')

router.use(express.json());
router.use('/', async (req,res)=>{
    
    const allgenre = await getGenres();
    res.send(allgenre)
})
module.exports = router;