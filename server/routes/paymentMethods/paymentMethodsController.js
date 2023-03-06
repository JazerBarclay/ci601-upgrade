const { selectAllPaymentMethods } = require("./paymentMethodsService");

module.exports = {
    getPaymentMethods: (req, res) => {
        selectAllPaymentMethods((err, response) => {
            if (err) return res.status(500).json({ error: "bad request" });
            if (response.rows.length < 1)
                return res.status(404).json({ error: "no results" });
            return res.status(200).json({
                payment_methods: response.rows,
            });
        });
    },
};
