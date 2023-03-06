// Import modules from controller
const { getAttendanceForLesson, getAttendanceForToday, getAttendanceForDate } = require('./attendanceController')

const router = require('express').Router();

router.get('/lesson/:lessonId', getAttendanceForLesson);

router.get('/today', getAttendanceForToday);

router.get('/date/:date', getAttendanceForDate);

module.exports = router;