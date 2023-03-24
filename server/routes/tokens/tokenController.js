// Import modules from service here
const { selectAllActiveTokens, selectAllActiveTokensByUser, insertFreeToken, selectTokenById, selectNextActiveTokensByUser } = require("./tokenService");

module.exports = {
    // Get all active tokens
    returnAllActiveTokens: (req, res) => {
        selectAllActiveTokens((err, response) => {
            if (err) return res.status(500).json({ message: "failed to read database", error: err });
            if (response.rows.length < 1)
                return res.status(404).json({ message: "no results" });
            return res.status(200).json({
                active_tokens: response.rows,
            });
        });
    },

    // Get all active tokens for a given member
    returnAllActiveTokensForMember: (req, res) => {
        selectAllActiveTokensByUser(req.params.id, (err, response) => {
            if (err) return res.status(500).json({ message: "failed to read database", error: err });
            if (response.rows.length < 1)
                return res.status(404).json({ message: "no results" });
            return res.status(200).json({
                active_tokens: response.rows,
            });
        });
    },

    returnNextActiveTokensForMember: (req, res) => {
        selectNextActiveTokensByUser(req.params.id, (err, response) => {
            if (err) return res.status(500).json({ message: "failed to read database", error: err });
            if (response.rows.length < 1)
                return res.status(404).json({ message: "no results" });
            return res.status(200).json({
                token: response.rows[0],
            });
        });
    },

    // Get all active tokens for a given member
    returnTokensById: (req, res) => {
        selectTokenById(req.params.id, (err, response) => {
            if (err) return res.status(500).json({ message: "failed to read database", error: err });
            if (response.rows.length < 1)
                return res.status(404).json({ message: "no results" });
            return res.status(200).json({
                active_tokens: response.rows,
            });
        });
    },

    // Generate a new free token for a member
    generateFreeToken: (req, res, next) => {
        insertFreeToken(req.params.id, (err, response) => {
            if (err) return res.status(500).json({ message: "failed to generate new member token", error: err });
            return next();
        });
    },

};
