// Import modules from login controller
const { validateParams, login, issueLoginToken, verifyToken, encryptPassword } = require('./loginController')

// Add router from express to manage routing
const router = require('express').Router()

// On login request, validate, try login, then issue login token
// Login takes email and password
// Returns JWT authentication token (contains id and validity duration)
router.post('/', validateParams, login, issueLoginToken)

// On /login/verify take in an encoded json web token and verify its contents
router.get('/verify', verifyToken)

// Testing encryption
router.post('/crypt', encryptPassword)

// On /login/renew, check if token is valid and return renewed token
//router.get('/renew', renewToken)

// Export this router module
module.exports = router;