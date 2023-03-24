const { getLessons, getTodaysLessons, addLesson, editLesson, getLessonById } = require('./lessonController');

const router = require('express').Router();

router.get('/', getLessons);

router.get('/id/:id', getLessonById);

router.get('/today', getTodaysLessons);

router.post('/', addLesson);

router.patch('/:id', editLesson);

module.exports = router;