const { addPayment } = require('../payments/paymentController');
const { calculatePurchasePrice, returnAllLessonPurchases, makeLessonPurchases, returnLessonPurchaseId, generateLessonPurchaseTokens } = require('./lessonPurchasesController');

const router = require('express').Router();

router.get('/', returnAllLessonPurchases);

router.post('/', calculatePurchasePrice, addPayment, makeLessonPurchases, generateLessonPurchaseTokens, returnLessonPurchaseId);

module.exports = router;