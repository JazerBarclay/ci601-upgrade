// Import database connection
const db = require("../../database/dbConnection");

module.exports = {
        // Select all lessons
        selectAllLessonPurchases: (callBack) => {
            db.query(`SELECT * FROM lesson_purchases;`, [], (error, results, fields) => {
                if (error) return callBack(error);
                return callBack(null, results);
            });
        },
}