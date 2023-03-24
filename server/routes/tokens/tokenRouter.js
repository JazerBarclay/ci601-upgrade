// Import modules from controller
const { returnAllActiveTokens, returnAllActiveTokensForMember, generateFreeToken, returnTokensById, returnNextActiveTokensForMember } = require('./tokenController')

const router = require('express').Router();

// Get all active tokens
router.get('/', returnAllActiveTokens);

// Get a token by id
router.get('/:id', returnTokensById);

// Get all tokens for member by id
router.get('/member/:id', returnAllActiveTokensForMember);

// Get all tokens for member by id
router.get('/next/:id', returnNextActiveTokensForMember);

module.exports = router;