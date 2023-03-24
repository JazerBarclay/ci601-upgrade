const { selectAllPaymentMethods, insertPaymentMethod, updatePaymentMethod } = require("./paymentMethodsService");

module.exports = {
    getPaymentMethods: (req, res) => {
        selectAllPaymentMethods((err, response) => {
            if (err) return res.status(500).json({ message: "failed to read database", error: err });
            if (response.rows.length < 1)
                return res.status(404).json({ message: "no results" });
            return res.status(200).json({
                payment_methods: response.rows,
            });
        });
    },
    addPaymentMethods: (req, res) => {
        insertPaymentMethod(req.body.name, (err, response) => {
            if (err) return res.status(500).json({ message: "failed to write to database", error: err });
            return res.status(201).json({
                id: response.rows[0].id,
            });
        });
    },
    editPaymentMethods: (req, res) => {
        updatePaymentMethod(req.body.name, req.params.id, (err, response) => {
            if (err) return res.status(500).json({ message: "failed to write to database", error: err });
            return res.status(204).send();
        });
    },
};
