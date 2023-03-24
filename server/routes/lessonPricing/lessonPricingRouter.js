const { getLessonPricing, updateLessonPricing } = require('./lessonPricingController');

const router = require('express').Router();

router.get('/', getLessonPricing);

router.patch('/:id', updateLessonPricing);

module.exports = router;