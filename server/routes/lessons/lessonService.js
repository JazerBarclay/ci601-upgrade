// Import database connection
const db = require("../../database/dbConnection");

// Database CRUD operations
module.exports = {
    // Select all lessons
    selectAllLessons: (callBack) => {
        db.query(
            `SELECT * FROM lessons_view WHERE cancelled = false LIMIT 1000;`,
            [],
            (error, results) => {
                if (error) return callBack(error);
                return callBack(null, results);
            }
        );
    },

    // Select lesson by ID
    selectLessonById: (id, callBack) => {
        db.query(
            `SELECT * FROM lessons_view WHERE id = $1;`,
            [id],
            (error, results) => {
                if (error) return callBack(error);
                return callBack(null, results);
            }
        );
    },

    // Select today's lessons
    selectTodaysLessons: (callBack) => {
        db.query(
            `SELECT * FROM lessons_view WHERE lesson_date >= current_date::timestamp ORDER BY lesson_date DESC, start_time DESC LIMIT 100;`,
            [],
            (error, results) => {
                if (error) return callBack(error);
                return callBack(null, results);
            }
        );
    },

    // Insert new lesson
    insertLesson: (type, date, start_time, end_time, callBack) => {
        db.query(
            `INSERT INTO lessons (
                type_id,
                date,
                start_time,
                end_time
            ) VALUES (
                $1, $2, $3, $4
            ) RETURNING id;`,
            [type, date, start_time, end_time],
            (error, results) => {
                if (error) return callBack(error);
                return callBack(null, results);
            }
        );
    },

    updateLesson: (type, date, start_time, end_time, id, callBack) => {
        db.query(
            `UPDATE lessons 
            SET type=$1, 
            date=$2, 
            start_time=$3, 
            end_time=$4
            WHERE id=$5;`,
            [type, date, start_time, end_time, id],
            (error, results) => {
                if (error) return callBack(error);
                return callBack(null, results);
            }
        );
    },
};
