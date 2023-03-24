// Import modules from controller
const { getAllPayments, getTodaysPayments, getWeeksPayments, getPaymentsForDate, getTodaysTotalPayments, getWeeksTotalPayments, getMonthsTotalPayments, getYearsTotalPayments } = require('./paymentController')

const router = require('express').Router();

router.get('/', getAllPayments);

// Totals
router.get('/total/today', getTodaysTotalPayments);

router.get('/total/week', getWeeksTotalPayments);

router.get('/total/month', getMonthsTotalPayments);

router.get('/total/year', getYearsTotalPayments);

// Breakdowns
router.get('/today', getTodaysPayments);

router.get('/week', getWeeksPayments);

router.get('/date/:date', getPaymentsForDate);

module.exports = router;