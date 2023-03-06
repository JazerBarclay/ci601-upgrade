// Import database connection
const db = require('../../database/dbConnection');

module.exports = {
    selectAllAttendanceForLesson: (lessonId, callback) => {
        db.query(
            `SELECT * FROM attendees WHERE lesson_id = $1;`,
            [lessonId],
            (error, results, fields) => {
                if (error) return callback(error);
                return callback(null, results);
            }
        );
    },
    selectAllAttendanceForToday: (callback) => {
        db.query(
            `SELECT * FROM attendees WHERE attendance_date >= current_date::timestamp;`,
            [],
            (error, results, fields) => {
                if (error) return callback(error);
                return callback(null, results);
            }
        );
    },
    selectAllAttendanceForDate: (date, callback) => {
        let addDayDate = new Date(date);
        addDayDate.setDate(addDayDate.getDate() + 1);
        const endDate = addDayDate.toISOString().split('T')[0];
        db.query(
            `SELECT * FROM attendees WHERE attendance_date >= $1 AND attendance_date <= $2;`,
            [date, endDate],
            (error, results, fields) => {
                if (error) return callback(error);
                return callback(null, results);
            }
        );
    },
}