// Import modules from controller
const {
    returnAllMembers,
    returnMemberById,
    addMember,
    editMember,
    returnMemberId,
    returnTotalMembers,
    returnTotalSignupsToday,
    returnTotalSignupsWeek,
    returnTotalSignupsMonth,
    returnTotalSignupsYear,
} = require("./memberController");
const { generateFreeToken } = require("../tokens/tokenController");

const router = require("express").Router();

router.get("/", returnAllMembers);

router.get("/:id", returnMemberById);


router.get("/total/all", returnTotalMembers);

router.get("/total/today", returnTotalSignupsToday);

router.get("/total/week", returnTotalSignupsWeek);

router.get("/total/month", returnTotalSignupsMonth);

router.get("/total/year", returnTotalSignupsYear);


router.post("/", addMember, generateFreeToken, returnMemberId);

router.patch("/:id", editMember, returnMemberId);

// Export this router module
module.exports = router;
