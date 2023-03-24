// Import database connection
const db = require("../../database/dbConnection");

// Database CRUD operations
module.exports = {
    // Select all payment methods
    selectAllPaymentMethods: (callBack) => {
        db.query(
            `SELECT * FROM payment_methods_view;`,
            [],
            (error, results) => {
                if (error) return callBack(error);
                return callBack(null, results);
            }
        );
    },

    // Insert new payment method
    insertPaymentMethod: (name, callBack) => {
        db.query(
            `INSERT INTO payment_methods (
                name
            ) VALUES (
                $1
            ) RETURNING id;`,
            [name],
            (error, results) => {
                if (error) return callBack(error);
                return callBack(null, results);
            }
        );
    },

    // Update payment method
    updatePaymentMethod: (name, id, callBack) => {
        db.query(
            `UPDATE payment_methods
            SET name = $1
            WHERE id = $2;`,
            [name, id],
            (error, results) => {
                if (error) return callBack(error);
                return callBack(null, results);
            }
        );
    },

};
