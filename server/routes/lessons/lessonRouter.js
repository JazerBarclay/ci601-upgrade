const { getLessons, addLesson, editLesson } = require('./lessonController');

const router = require('express').Router();

router.get('/', getLessons);

router.post('/', addLesson);

router.patch('/:id', editLesson);

module.exports = router;