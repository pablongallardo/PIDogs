require('dotenv').config();
const { Router } = require('express');
// Importar todos los routers;
const temperamentRoutes = require('./temperament.js');
const dogsRoutes = require('./dogs.js');
const dogR = require('./dog.js');
const router = Router();
// Configurar los routers
router.use('/temperament', temperamentRoutes);
router.use('/dogs', dogsRoutes);
router.use('/dog', dogR);

module.exports = router;
