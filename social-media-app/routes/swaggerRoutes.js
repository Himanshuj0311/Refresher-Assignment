const express = require('express');
const router = express.Router();
const { swaggerUi, specs } = require('../config/swagger');

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

module.exports = router;
