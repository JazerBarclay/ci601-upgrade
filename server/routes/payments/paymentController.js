// Import modules from service here
const { selectAllPayments, selectTodaysPayments, selectThisWeeksPayments, insertNewPayment, selectTodaysTotal, selectWeeksTotal, selectMonthsTotal, selectYearsTotal, selectFiscalTotal } = require("./paymentService");

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

    getTodaysTotalPayments: (req, res) => {
        selectTodaysTotal((err, response) => {
            if (err) return res.status(500).json({ error: err });
            if (response.rows.length < 1)
                return res.status(404).json({ message: "no results"});
            return res.status(200).json({
                total: response.rows[0].total,
            });
        });
    },

    getWeeksTotalPayments: (req, res) => {
        selectWeeksTotal((err, response) => {
            if (err) return res.status(500).json({ error: err });
            if (response.rows.length < 1)
                return res.status(404).json({ message: "no results"});
            return res.status(200).json({
                total: response.rows[0].total,
            });
        });
    },

    getMonthsTotalPayments: (req, res) => {
        selectMonthsTotal((err, response) => {
            if (err) return res.status(500).json({ error: err });
            if (response.rows.length < 1)
                return res.status(404).json({ message: "no results"});
            return res.status(200).json({
                total: response.rows[0].total,
            });
        });
    },

    getYearsTotalPayments: (req, res) => {
        selectFiscalTotal((err, response) => {
            if (err) return res.status(500).json({ error: err });
            if (response.rows.length < 1)
                return res.status(404).json({ message: "no results"});
            return res.status(200).json({
                total: response.rows[0].total,
            });
        });
    },

    getTodaysPayments: (req, res) => {
        selectTodaysPayments((err, response) => {
            if (err) return res.status(500).json({ error: err });
            if (response.rows.length < 1)
                return res.status(404).json({ message: "no results"});
            return res.status(200).json({
                payments: response.rows,
            });
        });
    },

    getWeeksPayments: (req, res) => {
        selectThisWeeksPayments((err, response) => {
            if (err) return res.status(500).json({error: err});
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

    addPayment: (req, res, next) => {
        insertNewPayment(req.body.member_id, req.body.payment_method_id, req.body.total, (err, response) => {
            if (err) return res.status(500);
            req.body.payment_id = Number(response.rows[0].id);
            return next();
        });
    },
};
