// Import modules from service here
const { selectAllPayments, selectTodaysPayments } = require("./paymentService");

module.exports = {
    getAllPayments: (req, res) => {
        selectAllPayments((err, response) => {
            if (err) return res.status(500);
            if (response.rows.length < 1)
                return res.status(404).json({ error: "no results" });
            return res.status(200).json({
                payments: response.rows,
            });
        });
    },
    getTodaysPayments: (req, res) => {
        selectTodaysPayments((err, response) => {
            if (err) return res.status(500);
            if (response.rows.length < 1)
                return res.status(404).json({ error: "no results" });
            return res.status(200).json({
                payments: response.rows,
            });
        });
    },

    getPaymentsForDate: (req, res) => {
        return res.status(200).json({ date: req.params.date });
    },
};
