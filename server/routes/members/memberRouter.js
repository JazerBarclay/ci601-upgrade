// Import modules from controller
const { getMembers, getMembersById } = require('./memberController')

const router = require('express').Router()

router.get('/', getMembers);

router.get('/:id', getMembersById);

// Export this router module
module.exports = router;