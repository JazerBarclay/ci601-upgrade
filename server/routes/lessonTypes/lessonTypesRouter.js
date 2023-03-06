const { getLessonTypes } = require('./lessonTypesController');

const router = require('express').Router();

router.get('/', getLessonTypes);

module.exports = router;