// Import database connection
const db = require('../../database/dbConnection');

module.exports = {
    selectAllPayments: (callback) => {
        db.query(
            `SELECT * FROM all_payments;`,
            [],
            (error, results, fields) => {
                if (error) return callback(error);
                return callback(null, results);
            }
        );
    },
    selectTodaysPayments: (callback) => {
        db.query(
            `SELECT * FROM all_payments WHERE payment_date >= current_date::timestamp;`,
            [],
            (error, results, fields) => {
                if (error) return callback(error);
                return callback(null, results);
            }
        );
    },
}