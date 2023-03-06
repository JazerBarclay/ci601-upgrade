// Import modules from service here
const { selectAllAttendanceForLesson, selectAllAttendanceForToday, selectAllAttendanceForDate } = require("./attendanceService");

module.exports = {
    getAttendanceForLesson: (req, res) => {
        selectAllAttendanceForLesson(req.params.lessonId, (err, response) => {
            if (err) return res.status(500);
            if (response.rows.length < 1)
                return res.status(404).json({ error: "no results" });
            return res.status(200).json({
                attendees: response.rows
            });
        });
    },
    getAttendanceForToday: (req, res) => {
        selectAllAttendanceForToday((err, response) => {
            if (err) return res.status(500);
            if (response.rows.length < 1)
                return res.status(404).json({ error: "no results" });
            return res.status(200).json({
                attendees: response.rows
            });
        });
    },
    getAttendanceForDate: (req, res) => {
        selectAllAttendanceForDate(req.params.date, (err, response) => {
            if (err) return res.status(500);
            if (response.rows.length < 1)
                return res.status(404).json({ error: "no results" });
            return res.status(200).json({
                attendees: response.rows
            });
        });
    },
};
