// Import database connection
const db = require("../../database/dbConnection");

// Database CRUD operations
module.exports = {
    // Select all lesson prices
    selectAllLessonPricing: (callBack) => {
        db.query(`SELECT * FROM lesson_pricing_view;`, [], (error, results) => {
            if (error) return callBack(error);
            return callBack(null, results);
        });
    },

    getLessonPriceByIds: (lesson_type_id, purchase_type_id, callBack) => {
        db.query(
            `SELECT * FROM lesson_pricing_view 
            WHERE lesson_type_id = $1
            AND lesson_purchase_type_id = $2
            LIMIT 1;`,
            [lesson_type_id, purchase_type_id],
            (error, results) => {
                if (error) return callBack(error);
                return callBack(null, results);
            }
        );
    },

    // Insert new lesson pricing
    insertLessonPricing: (
        lesson_type_id,
        purchase_type_id,
        price,
        callBack
    ) => {
        db.query(
            `INSERT INTO lesson_pricing (
                lesson_type_id,
                lesson_purchase_type_id,
                price
            ) VALUES (
                $1, $2, $3
            ) RETURNING id;`,
            [lesson_type_id, purchase_type_id, price],
            (error, results) => {
                if (error) return callBack(error);
                return callBack(null, results);
            }
        );
    },

    // Update lesson pricing
    insertLessonPricing: (price, id, callBack) => {
        db.query(
            `UPDATE lesson_pricing 
            SET price = $1
            WHERE id = $2;`,
            [price, id],
            (error, results) => {
                if (error) return callBack(error);
                return callBack(null, results);
            }
        );
    },
};
