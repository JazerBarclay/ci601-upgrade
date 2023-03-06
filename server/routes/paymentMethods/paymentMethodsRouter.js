const { getPaymentMethods } = require('./paymentMethodsController');

const router = require('express').Router();

router.get('/', getPaymentMethods);

module.exports = router;