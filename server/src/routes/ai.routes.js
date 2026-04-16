const express = require('express');
const router = express.Router();
const multer = require('multer');
const aiController = require('../controllers/ai.controller');

// Temporary storage for uploaded images before sending to AI
const upload = multer({ dest: 'uploads/' });

router.post('/analyze', upload.single('image'), aiController.analyzeImage);

module.exports = router;
