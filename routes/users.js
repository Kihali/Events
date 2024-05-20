const router = require('express').Router()
const User = require('../models/Users')

router.get('/id', async(req, res) => {
    const userId = req.params.id
})

module.exports = router