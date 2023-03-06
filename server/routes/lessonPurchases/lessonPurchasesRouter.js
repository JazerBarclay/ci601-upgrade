const { getLessonPurchases } = require('./lessonPurchasesController');

const router = require('express').Router();

router.get('/', getLessonPurchases);

module.exports = router;