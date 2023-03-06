const { getLessonPricing } = require('./lessonPricingController');

const router = require('express').Router();

router.get('/', getLessonPricing);

module.exports = router;