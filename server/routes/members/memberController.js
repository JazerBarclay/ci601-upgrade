// Import modules from service here
const { selectAllMembers, selectMemberById } = require('./memberService')

module.exports = {

    // Returns the user requested by the username in get request
    getMembers: (req, res) => {
        selectAllMembers((err, response) => {
            if (err) return res.status(500).json({ error: "bad request" });
            if (response.rows.length < 1) return res.status(404).json({ error: "no results" });
            return res.status(200).json({
                members: response.rows
            });
        });
    },

    // Returns the user requested by the username in get request
    getMembersById: (req, res) => {
        selectMemberById(req.params.id, (err, response) => {
            if (err) return res.status(400).json({ error: "bad request" });
            if (response.rows.length < 1) return res.status(404).json({ error: "no results" });
            return res.status(200).json({
                member: response.rows[0]
            });
        });
    },

}