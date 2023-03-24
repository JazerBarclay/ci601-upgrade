// Import database connection
const db = require('../../database/dbConnection');

// Database CRUD operations
module.exports = {
    // Select all payments
    selectAllPayments: (callback) => {
        db.query(
            `SELECT * FROM payments_view;`,
            [],
            (error, results) => {
                if (error) return callback(error);
                return callback(null, results);
            }
        );
    },

    // Select today's total 
    selectTodaysTotal: (callback) => {
        db.query(
            `SELECT SUM(total) AS total 
            FROM payments_view 
            WHERE date >= current_date::timestamp;`,
            [],
            (error, results) => {
                if (error) return callback(error);
                return callback(null, results);
            }
        );
    },

    // Select today's total 
    selectWeeksTotal: (callback) => {

        // Today's offset from Monday
        let dayOfWeek = new Date().getDay();

        // Fix for Sunday which is 0
        dayOfWeek = (dayOfWeek === 0 ? 7 : dayOfWeek);

        // Offset => Mon 1, Tue, 2 ... Sun 7

        // Set start of week date
        const startOfWeekDate = new Date(
            new Date().setDate(new Date().getDate() - dayOfWeek + 1))
                .toISOString()
                .split("T")[0];

        db.query(
            `SELECT SUM(total) AS total 
            FROM payments_view 
            WHERE date >= $1
            AND date <= current_date + INTERVAL '1 day';`,
            [startOfWeekDate],
            (error, results) => {
                if (error) return callback(error);
                return callback(null, results);
            }
        );

    },

    // Select today's total 
    selectMonthsTotal: (callback) => {

        // Get todays date
        const today = new Date()
            .toISOString()
            .split("T")[0];

        // Split year, month and day
        const arr = today.split('-');

        // Reconstruct with 1st of month
        const beginningOfMonth = `${arr[0]}-${arr[1]}-01`;

        db.query(
            `SELECT SUM(total) AS total 
            FROM payments_view 
            WHERE date >= $1
            AND date <= current_date + INTERVAL '1 day';`,
            [beginningOfMonth],
            (error, results) => {
                if (error) return callback(error);
                return callback(null, results);
            }
        );

    },

    // Select today's total 
    selectYearsTotal: (callback) => {

        // Get todays date
        const today = new Date()
            .toISOString()
            .split("T")[0];

        // Split year, month and day
        const arr = today.split('-');

        // Reconstruct with 1st of year
        const beginningOfYear = `${arr[0]}-01-01`;

        db.query(
            `SELECT SUM(total) AS total 
            FROM payments_view 
            WHERE date >= $1
            AND date <= current_date + INTERVAL '1 day';`,
            [beginningOfYear],
            (error, results) => {
                if (error) return callback(error);
                return callback(null, results);
            }
        );

    },

    // Select today's total 
    selectFiscalTotal: (callback) => {

        let fiscalYear = new Date().toISOString().split('-')[0];
        const compDate = new Date(`${fiscalYear}-04-06`);

        // If this year's comparison date is higher, 
        // then calculate for last year
        if (new Date() < compDate) fiscalYear -= 1;

        db.query(
            `SELECT SUM(total) AS total 
            FROM payments
            WHERE date >= $1
            AND date <= $2;`,
            [`${fiscalYear}-04-06`, `${parseInt(fiscalYear) + 1}-04-05`],
            (error, results) => {
                if (error) return callback(error);
                return callback(null, results);
            }
        );

    },

    // Select today's payments
    selectTodaysPayments: (callback) => {
        db.query(
            `SELECT * FROM payments_view WHERE date >= current_date::timestamp;`,
            [],
            (error, results) => {
                if (error) return callback(error);
                return callback(null, results);
            }
        );
    },

    selectThisWeeksPayments: (callback) => {

        const startOfWeekDate = new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + 1));
        const monday = startOfWeekDate.toISOString().split("T")[0];
        const today = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0];

        db.query(
            `SELECT * FROM payments_view WHERE date >= '${monday}' AND date <= '${today}';`,
            [],
            (error, results) => {
                if (error) return callback(error);
                return callback(null, results);
            }
        );

    },

    selectPaymentsBetweenDates: (startDate, endDate, callback) => {

        const startOfWeekDate = new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + 1));
        const monday = startOfWeekDate.toISOString().split("T")[0];
        const today = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0];

        db.query(
            `SELECT * FROM payments_view WHERE date >= '${startDate}' AND date <= '${endDate}';`,
            [],
            (error, results) => {
                if (error) return callback(error);
                return callback(null, results);
            }
        );

    },

    // Insert new payment
    insertNewPayment: (member_id, method_id, total, callback) => {
        db.query(
            `INSERT INTO payments (
                member_id, 
                method_id, 
                total
            ) VALUES (
                $1, $2, $3
            ) RETURNING id;`,
            [member_id, method_id, total],
            (error, results) => {
                if (error) return callback(error);
                return callback(null, results);
            }
        );
    },


    
}