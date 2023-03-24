// Import database connection
const db = require("../../database/dbConnection");

// Database CRUD operations
module.exports = {
    // Select all lesson types
    selectAllLessonTypes: (callBack) => {
        db.query(`SELECT * FROM lesson_types_view;`, 
        [], 
        (error, results) => {
            if (error) return callBack(error);
            return callBack(null, results);
        });
    },

    // Insert new lesson type
    insertLessonType: (name, callback) => {
        db.query(
            `INSERT INTO lesson_types (
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

    // Update lesson type
    updateLessonType: (id, name, callback) => {
        db.query(
            `UPDATE lesson_types 
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
