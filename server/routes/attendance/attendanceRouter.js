// Import modules from controller
const { getAttendanceForLesson, getAttendanceForToday, getAttendanceForWeek, getAttendanceForDate, addAttendanceForLesson, getTotalAttendanceToday, getTotalAttendanceWeek, getTotalAttendanceMonth } = require('./attendanceController')

const router = require('express').Router();

// Get attendances for lesson by id
router.get('/lesson/:lessonId', getAttendanceForLesson);

// Get total attendances for all lessons today
router.get('/total/today', getTotalAttendanceToday);

// Get total attendances for all lessons today
router.get('/total/week', getTotalAttendanceWeek);

// Get total attendances for all lessons today
router.get('/total/month', getTotalAttendanceMonth);

// Get total attendances for all lessons today
router.get('/total/year', getTotalAttendanceToday);

// Get all attendances for all lessons today
router.get('/today', getAttendanceForToday);

// Get all attendances for all lessons this week
router.get('/week', getAttendanceForWeek);

// Get all attendances for lessons on given date
router.get('/date/:date', getAttendanceForDate);

// Add new attendance for lesson
router.post('/lesson/:id', addAttendanceForLesson);

module.exports = router;