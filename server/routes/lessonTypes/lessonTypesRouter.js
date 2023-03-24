const { returnAllLessonTypes } = require('./lessonTypesController');

const router = require('express').Router();

router.get('/', returnAllLessonTypes);

module.exports = router;