// Import modules from controller
const { getMembers, getMembersById, addMember, editMember } = require('./memberController');

const router = require('express').Router()

router.get('/', getMembers);

router.get('/:id', getMembersById);

router.post('/', addMember);

router.patch('/:id', editMember);

// Export this router module
module.exports = router;