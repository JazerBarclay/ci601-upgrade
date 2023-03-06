// Import database connection
const db = require("../../database/dbConnection");

module.exports = {
        // Select all lessons
        selectAllLessonTypes: (callBack) => {
            db.query(`SELECT * FROM lesson_types;`, [], (error, results, fields) => {
                if (error) return callBack(error);
                return callBack(null, results);
            });
        },
}