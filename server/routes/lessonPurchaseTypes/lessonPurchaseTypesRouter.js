const { getLessonPurchaseTypes } = require('./lessonPurchaseTypesController');

const router = require('express').Router();

router.get('/', getLessonPurchaseTypes);

module.exports = router;