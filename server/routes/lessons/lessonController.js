const { selectAllLessons, selectTodaysLessons, insertLesson, updateLesson, selectLessonById } = require("./lessonService");

module.exports = {
    getLessons: (req, res) => {
        selectAllLessons((err, response) => {
            if (err) return res.status(500).json({ message: "failed to read database", error: err });
            if (response.rows.length < 1)
                return res.status(404).json({ message: "no results" });
            return res.status(200).json({
                lessons: response.rows,
            });
        });
    },

    getLessonById: (req, res) => {
        selectLessonById(req.params.id, (err, response) => {
            if (err) return res.status(500).json({ message: "failed to read database", error: err });
            if (response.rows.length < 1)
                return res.status(404).json({ message: "no results" });
            return res.status(200).json({
                lessons: response.rows,
            });
        });
    },

    getTodaysLessons: (req, res) => {
        selectTodaysLessons((err, response) => {
            if (err) return res.status(500).json({ message: "failed to read database", error: err });
            if (response.rows.length < 1)
                return res.status(404).json({ message: "no results" });
            return res.status(200).json({
                lessons: response.rows,
            });
        });
    },

    addLesson: (req, res) => {
        insertLesson(req.body.lesson_type, req.body.date, req.body.start_time, req.body.end_time, (err, response) => {
            if (err) return res.status(500).json({ message: "failed to write to database", error: err });
            return res.status(201).json({id: response.rows[0].id});
        })
    },

    editLesson: (req, res) => {
        updateLesson(req.body.lessonType, req.body.lessonDate, req.body.startTime, req.body.endTime, req.params.id, (err,response) => {
            if (err) return res.status(500).json({ message: "failed to write to database", error: err });
            return res.status(201).json();
        })
    },
};
