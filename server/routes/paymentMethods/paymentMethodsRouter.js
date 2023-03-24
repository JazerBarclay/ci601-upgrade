const { getPaymentMethods, addPaymentMethods, editPaymentMethods } = require('./paymentMethodsController');

const router = require('express').Router();

// Get all payment methods
router.get('/', getPaymentMethods);

// Add new payment method
router.post('/', addPaymentMethods);

// Edit existing payment method by id
router.patch('/:id', editPaymentMethods);

module.exports = router;