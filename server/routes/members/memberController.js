// Import modules from service here
const {
    selectAllMembers,
    selectMemberById,
    insertMember,
    updateMember,
    selectTotalMembers,
    selectTotalSignupsToday,
    selectTotalSignupsWeek,
    selectTotalSignupsMonth,
    selectTotalSignupsYear,
} = require("./memberService");

module.exports = {
    
    returnMemberId: (req, res) => {
        return res.status(201).json({ id: req.params.id });
    },

    // Returns the user requested by the username in get request
    returnAllMembers: (req, res) => {
        selectAllMembers((err, response) => {
            if (err)
                return res
                    .status(500)
                    .json({ error: "failed to process request" });
            if (response.rows.length < 1)
                return res.status(404).json({ error: "no results found" });
            return res.status(200).json({
                members: response.rows,
            });
        });
    },

    // Returns the user requested by the username in get request
    returnMemberById: (req, res) => {
        selectMemberById(req.params.id, (err, response) => {
            if (err) return res.status(400).json({ error: "bad request" });
            if (response.rows.length < 1)
                return res.status(404).json({ error: "no results" });
            return res.status(200).json({
                member: response.rows[0],
            });
        });
    },

    // Returns the user requested by the username in get request
    returnTotalMembers: (req, res) => {
        selectTotalMembers((err, response) => {
            if (err) return res.status(400).json({ error: "bad request" });
            if (response.rows.length < 1)
                return res.status(404).json({ error: "no results" });
            return res.status(200).json({
                total: response.rows[0].members,
            });
        });
    },

    // Returns the user requested by the username in get request
    returnTotalSignupsToday: (req, res) => {
        selectTotalSignupsToday((err, response) => {
            if (err) return res.status(400).json({ error: "bad request" });
            if (response.rows.length < 1)
                return res.status(404).json({ error: "no results" });
            return res.status(200).json({
                total: response.rows[0].signups,
            });
        });
    },

    // Returns the user requested by the username in get request
    returnTotalSignupsWeek: (req, res) => {
        selectTotalSignupsWeek((err, response) => {
            if (err) return res.status(400).json({ error: "bad request" });
            if (response.rows.length < 1)
                return res.status(404).json({ error: "no results" });
            return res.status(200).json({
                total: response.rows[0].signups,
            });
        });
    },

    // Returns the user requested by the username in get request
    returnTotalSignupsMonth: (req, res) => {
        selectTotalSignupsMonth((err, response) => {
            if (err) return res.status(400).json({ error: "bad request" });
            if (response.rows.length < 1)
                return res.status(404).json({ error: "no results" });
            return res.status(200).json({
                total: response.rows[0].signups,
            });
        });
    },

    // Returns the user requested by the username in get request
    returnTotalSignupsYear: (req, res) => {
        selectTotalSignupsYear((err, response) => {
            if (err) return res.status(400).json({ error: "bad request" });
            if (response.rows.length < 1)
                return res.status(404).json({ error: "no results" });
            return res.status(200).json({
                total: response.rows[0].signups,
            });
        });
    },

    // Returns the user requested by the username in get request
    addMember: (req, res, next) => {
        insertMember(
            req.body.first_name,
            req.body.last_name,
            req.body.contact_number,
            req.body.email_address,
            req.body.grade,
            req.body.licensed,
            req.body.outstanding,
            req.body.contact_by_email,
            req.body.primary_contact,
            req.body.primary_contact_number,
            req.body.secondary_contact,
            req.body.secondary_contact_number,
            req.body.notes,
            (err, response) => {
                if (err)
                    return res
                        .status(500)
                        .json({ error: "failed to insert new member", err });
                req.params.id = response.rows[0].id;
                return next();
            }
        );
    },

    // Returns the user requested by the username in get request
    editMember: (req, res, next) => {
        updateMember(
            req.body.first_name,
            req.body.last_name,
            req.body.contact_number,
            req.body.email_address,
            req.body.grade,
            req.body.licensed,
            req.body.outstanding,
            req.body.contact_by_email,
            req.body.primary_contact,
            req.body.primary_contact_number,
            req.body.secondary_contact,
            req.body.secondary_contact_number,
            req.body.notes,
            req.params.id,
            (err, response) => {
                if (err)
                    return res.status(400).json({ error: "bad request", err });
                    req.params.id = Number(req.params.id);
                return next();
            }
        );
    },
};
