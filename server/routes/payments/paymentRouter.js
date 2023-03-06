// Import modules from controller
const { getAllPayments, getTodaysPayments, getPaymentsForDate } = require('./paymentController')

const router = require('express').Router();

router.get('/', getAllPayments);

router.get('/today', getTodaysPayments);

router.get('/date/:date', getPaymentsForDate);

module.exports = router;