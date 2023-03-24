// Import database connection
const db = require("../../database/dbConnection");

// Database CRUD operations
module.exports = {
    
    // Select all attendances
    selectAllAttendanceForLesson: (lesson_id, callback) => {
        db.query(
            `SELECT * FROM attendees 
            WHERE lesson_id = $1;`,
            [lesson_id],
            (error, results) => {
                if (error) return callback(error);
                return callback(null, results);
            }
        );
    },

    // Select all attendances for today
    selectTotalAttendanceToday: (callback) => {
        db.query(
            `SELECT COUNT(*) AS total FROM attendees 
            WHERE attendance_date >= current_date::timestamp;`,
            [],
            (error, results) => {
                if (error) return callback(error);
                return callback(null, results);
            }
        );
    },

    // Select all attendances for today
    selectTotalAttendanceWeek: (callback) => {

        // Today's offset from Monday
        let dayOfWeek = new Date().getDay();

        // Fix for Sunday which is 0
        dayOfWeek = (dayOfWeek === 0 ? 7 : dayOfWeek);

        // Offset => Mon 1, Tue, 2 ... Sun 7

        // Set start of week date
        const startOfWeekDate = new Date(
            new Date().setDate(new Date().getDate() - dayOfWeek + 1))
                .toISOString()
                .split("T")[0];

        db.query(
            `SELECT COUNT(*) AS total FROM attendees 
            WHERE attendance_date >= $1
            AND attendance_date <= current_date + INTERVAL '1 day';`,
            [startOfWeekDate],
            (error, results) => {
                if (error) return callback(error);
                return callback(null, results);
            }
        );
    },

    // Select all attendances for today
    selectTotalAttendanceMonth: (callback) => {

        // Get todays date
        const today = new Date()
            .toISOString()
            .split("T")[0];

        // Split year, month and day
        const arr = today.split('-');

        // Reconstruct with 1st of month
        const beginningOfMonth = `${arr[0]}-${arr[1]}-01`;

        db.query(
            `SELECT COUNT(*) AS total FROM attendees 
            WHERE attendance_date >= $1
            AND attendance_date <= current_date + INTERVAL '1 day';`,
            [beginningOfMonth],
            (error, results) => {
                if (error) return callback(error);
                return callback(null, results);
            }
        );
    },

    // Select all attendances for year
    selectTotalAttendanceYear: (callback) => {

        // Get todays date
        const today = new Date()
            .toISOString()
            .split("T")[0];

        // Split year, month and day
        const arr = today.split('-');

        // Reconstruct with 1st of month
        const beginningOfMonth = `${arr[0]}-01-01`;

        db.query(
            `SELECT COUNT(*) AS total FROM attendees 
            WHERE attendance_date >= $1
            AND attendance_date <= current_date + INTERVAL '1 day';`,
            [beginningOfMonth],
            (error, results) => {
                if (error) return callback(error);
                return callback(null, results);
            }
        );
    },

    // Select all attendances for today
    selectAllAttendanceForToday: (callback) => {
        db.query(
            `SELECT * FROM attendees 
            WHERE attendance_date >= current_date::timestamp;`,
            [],
            (error, results) => {
                if (error) return callback(error);
                return callback(null, results);
            }
        );
    },

    // Select all attendances for today
    selectAllAttendanceForWeek: (callback) => {

        const startOfWeekDate = new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + 1));
        const monday = startOfWeekDate.toISOString().split("T")[0];
        const today = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0];

        db.query(
            `SELECT * FROM attendees 
            WHERE attendance_date >= '${monday}' AND attendance_date <= '${today}';`,
            [],
            (error, results) => {
                if (error) return callback(error);
                return callback(null, results);
            }
        );
    },

    // Select all attendances for a given date
    selectAllAttendanceForDate: (date, callback) => {
        let addDayDate = new Date(date);
        addDayDate.setDate(addDayDate.getDate() + 1);
        const endDate = addDayDate.toISOString().split("T")[0];

        db.query(
            `SELECT * FROM attendees 
            WHERE attendance_date >= $1 
            AND attendance_date <= $2;`,
            [date, endDate],
            (error, results) => {
                if (error) return callback(error);
                return callback(null, results);
            }
        );
    },

    // Insert new attendance
    insertAttendance: (lesson_id, member_id, token_id, callback) => {
        db.query(
            `INSERT INTO attendees (
                lesson_id,
                member_id,
                token_id
            ) VALUES (
                $1, $2, $3
            ) RETURNING id;`,
            [lesson_id, member_id, token_id],
            (error, results) => {
                if (error) return callback(error);
                return callback(null, results);
            }
        );
    },

    // Remove attendance
    removeAttendance: (id, callback) => {
        db.query(
            `DELETE FROM attendees
            WHERE id = $1;`,
            [id],
            (error, results) => {
                if (error) return callback(error);
                return callback(null, results);
            }
        );
    },
};
