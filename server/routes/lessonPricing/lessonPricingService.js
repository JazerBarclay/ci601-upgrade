// Import database connection
const db = require("../../database/dbConnection");

module.exports = {
        // Select all lessons
        selectAllLessonPricing: (callBack) => {
            db.query(`SELECT * FROM lesson_pricing;`, [], (error, results, fields) => {
                if (error) return callBack(error);
                return callBack(null, results);
            });
        },
}