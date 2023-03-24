// Import database connection
const db = require("../../database/dbConnection");

// Database CRUD operations
module.exports = {
    // Select all lesson purchases
    selectAllLessonPurchases: (callBack) => {
        db.query(
            `SELECT * FROM lesson_purchases_view;`,
            [],
            (error, results) => {
                if (error) return callBack(error);
                return callBack(null, results);
            }
        );
    },

    // Insert new lesson purchase
    insertLessonPurchase: (
        member_id,
        lesson_type_id,
        purchase_type_id,
        payment_id,
        price,
        callBack
    ) => {
        db.query(
            `INSERT INTO lesson_purchases (
                member_id,
                lesson_type_id,
                purchase_type_id,
                payment_id,
                price
            ) VALUES (
                $1,$2,$3,$4,$5
            ) RETURNING id;`,
            [member_id, lesson_type_id, purchase_type_id, payment_id, price],
            (error, results) => {
                if (error) return callBack(error);
                return callBack(null, results);
            }
        );
    },

    // Update lesson purchase
    updateLessonPurchase: (
        member_id,
        lesson_type_id,
        purchase_type_id,
        payment_id,
        price,
        id,
        callBack
    ) => {
        db.query(
            `UPDATE lesson_purchases
            SET member_id = $1,
            lesson_type_id = $2,
            purchase_type_id = $3,
            payment_id = $4,
            price = $5
            WHERE id = $6;`,
            [member_id, lesson_type_id, purchase_type_id, payment_id, price, id],
            (error, results) => {
                if (error) return callBack(error);
                return callBack(null, results);
            }
        );
    },
};
