// Import database connection
const db = require("../../database/dbConnection");

// Database CRUD operations
module.exports = {
    // Select all lesson purchase types
    selectAllLessonPurchaseTypes: (callBack) => {
        db.query(
            `SELECT * FROM lesson_purchase_types_view;`,
            [],
            (error, results) => {
                if (error) return callBack(error);
                return callBack(null, results);
            }
        );
    },

    // Select lesson purchase type by id
    selectLessonPurchaseTypesById: (id, callBack) => {
        db.query(
            `SELECT * FROM lesson_purchase_types_view WHERE id = $1;`,
            [id],
            (error, results) => {
                if (error) return callBack(error);
                return callBack(null, results);
            }
        );
    },

    // Insert new lesson purchase type
    insertLessonPurchaseType: (name, duration, weeks, multiplier, callback) => {
        db.query(
            `INSERT INTO lesson_purchase_types (
                name,
                duration_days,
                weeks,
                multiplier
            ) VALUES (
                $1, $2, $3, $4
            ) RETURNING id;`,
            [name, duration, weeks, multiplier],
            (error, results) => {
                if (error) return callBack(error);
                return callBack(null, results);
            }
        );
    },

    // Update lesson purchase type
    insertLessonPurchaseType: (name, duration, weeks, multiplier, id, callback) => {
        db.query(
            `UPDATE lesson_purchase_types 
            SET name = $1,
            duration_days = $2,
            weeks = $3,
            multiplier = $4
            WHERE id = $5;`,
            [name, duration, weeks, multiplier, id],
            (error, results) => {
                if (error) return callBack(error);
                return callBack(null, results);
            }
        );
    },

};
