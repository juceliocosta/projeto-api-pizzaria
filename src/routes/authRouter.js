const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');

router.post('/register', auth.registrarController);
router.post('/login', auth.logarController);