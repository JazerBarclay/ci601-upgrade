// Import database connection
const db = require("../../database/dbConnection");

module.exports = {
        // Select all lessons
        selectAllPaymentMethods: (callBack) => {
            db.query(`SELECT * FROM payment_methods;`, [], (error, results, fields) => {
                if (error) return callBack(error);
                return callBack(null, results);
            });
        },
}