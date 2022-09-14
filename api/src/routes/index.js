require('dotenv').config();
const { Router } = require('express');
var cors = require('cors');
const data = require('../models/data.json')
// Importar todos los routers;
const temperamentRoutes = require('./temperament.js');
const dogsRoutes = require('./dogs.js');
const dogR = require('./dog.js');
const router = Router();
// Configurar los routers

router.get('/', (req,res) => {
    res.send('Welcome')
})

router.get('/test', (req, res) => {
    res.send(data)
})
router.use('/temperament', cors(), temperamentRoutes);
router.use('/dogs', cors(), dogsRoutes);
router.use('/dog', dogR);

module.exports = router;
