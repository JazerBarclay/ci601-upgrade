// Import database connection
const db = require("../../database/dbConnection");

module.exports = {
        // Select all lessons
        selectAllLessons: (callBack) => {
            db.query(`SELECT * FROM lessons ORDER BY lesson_date DESC, start_time DESC LIMIT 20;`, [], (error, results, fields) => {
                if (error) return callBack(error);
                return callBack(null, results);
            });
        },

        insertLesson: (type, date, start, end, callBack) => {
            db.query(`INSERT INTO lessons (type, lesson_date, start_time, end_time) VALUES ($1, $2, $3, $4);`, 
            [type, date, start, end], 
            (error, results, fields) => {
                if (error) return callBack(error);
                return callBack(null, results);
            });
        },

        updateLesson: (type, date, start, end, id, callBack) => {
            db.query(`UPDATE lessons SET type=$1, lesson_date=$2, start_time=$3, end_time=$4 WHERE id=$5;`, 
            [type, date, start, end, id], 
            (error, results, fields) => {
                if (error) return callBack(error);
                return callBack(null, results);
            });
        }
}