// Import modules from service here
const {
    selectAllMembers,
    selectMemberById,
    insertMember,
    updateMember
} = require("./memberService");

module.exports = {
    // Returns the user requested by the username in get request
    getMembers: (req, res) => {
        selectAllMembers((err, response) => {
            if (err) return res.status(500).json({ error: "bad request" });
            if (response.rows.length < 1)
                return res.status(404).json({ error: "no results" });
            return res.status(200).json({
                members: response.rows,
            });
        });
    },

    // Returns the user requested by the username in get request
    getMembersById: (req, res) => {
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
    addMember: (req, res) => {
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
                    return res.status(400).json({ error: "bad request", err });
                return res.status(201).json();
            }
        );
    },

    // Returns the user requested by the username in get request
    editMember: (req, res) => {
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
                return res.status(200).json();
            }
        );
    },
};
