// Import modules from service here
const { spendToken } = require("../tokens/tokenService");
const {
    selectAllAttendanceForLesson,
    selectAllAttendanceForToday,
    selectAllAttendanceForWeek,
    selectAllAttendanceForDate,
    insertAttendance,
    selectTotalAttendanceToday,
    selectTotalAttendanceWeek,
    selectTotalAttendanceMonth,
} = require("./attendanceService");

module.exports = {
    // Get attendancens for a lesson
    getAttendanceForLesson: (req, res) => {
        selectAllAttendanceForLesson(req.params.lessonId, (err, response) => {
            if (err)
                return res
                    .status(500)
                    .json({ message: "failed to read database", error: err });
            if (response.rows.length < 1)
                return res.status(404).json({ message: "no results" });
            return res.status(200).json({
                attendees: response.rows,
            });
        });
    },

    // Get all attendances for todays lessons
    getTotalAttendanceToday: (req, res) => {
        selectTotalAttendanceToday((err, response) => {
            if (err)
                return res
                    .status(500)
                    .json({ message: "failed to read database", error: err });
            if (response.rows.length < 1)
                return res.status(404).json({ message: "no results" });
            return res.status(200).json({
                total: response.rows[0].total,
            });
        });
    },

    // Get all attendances for todays lessons
    getTotalAttendanceWeek: (req, res) => {
        selectTotalAttendanceWeek((err, response) => {
            if (err)
                return res
                    .status(500)
                    .json({ message: "failed to read database", error: err });
            if (response.rows.length < 1)
                return res.status(404).json({ message: "no results" });
            return res.status(200).json({
                total: response.rows[0].total,
            });
        });
    },

    // Get all attendances for todays lessons
    getTotalAttendanceMonth: (req, res) => {
        selectTotalAttendanceMonth((err, response) => {
            if (err)
                return res
                    .status(500)
                    .json({ message: "failed to read database", error: err });
            if (response.rows.length < 1)
                return res.status(404).json({ message: "no results" });
            return res.status(200).json({
                total: response.rows[0].total,
            });
        });
    },

    // Get all attendances for todays lessons
    getAttendanceForToday: (req, res) => {
        selectAllAttendanceForToday((err, response) => {
            if (err)
                return res
                    .status(500)
                    .json({ message: "failed to read database", error: err });
            if (response.rows.length < 1)
                return res.status(404).json({ message: "no results" });
            return res.status(200).json({
                attendees: response.rows,
            });
        });
    },

    // Get all attendances for todays lessons
    getAttendanceForWeek: (req, res) => {
        selectAllAttendanceForWeek((err, response) => {
            if (err)
                return res
                    .status(500)
                    .json({ message: "failed to read database", error: err });
            if (response.rows.length < 1)
                return res.status(404).json({ message: "no results" });
            return res.status(200).json({
                attendees: response.rows,
            });
        });
    },

    // Get all attendances for lessons on given date
    getAttendanceForDate: (req, res) => {
        selectAllAttendanceForDate(req.params.date, (err, response) => {
            if (err)
                return res
                    .status(500)
                    .json({ message: "failed to read database", error: err });
            if (response.rows.length < 1)
                return res.status(404).json({ message: "no results" });
            return res.status(200).json({
                attendees: response.rows,
            });
        });
    },

    // Add an attendance for a lesson
    addAttendanceForLesson: (req, res) => {
        insertAttendance(
            req.params.id,
            req.body.member_id,
            req.body.token_id,
            (err, response) => {
                if (err)
                    return res
                        .status(500)
                        .json({
                            message: "failed to write to database",
                            error: err,
                        });

                if (req.body.token_id)
                    spendToken(req.body.token_id, (err, r2) => {
                        if (err)
                            console.log(`Failed spend ${req.body.token_id}`);
                    });

                return res.status(201).json({
                    id: response.rows[0].id,
                });
            }
        );
    },
};
