const { selectAllLessons, insertLesson, updateLesson } = require("./lessonService");

module.exports = {
    getLessons: (req, res) => {
        selectAllLessons((err, response) => {
            if (err) return res.status(500).json({ error: "bad request" });
            if (response.rows.length < 1)
                return res.status(404).json({ error: "no results" });
            return res.status(200).json({
                lessons: response.rows,
            });
        });
    },

    addLesson: (req, res) => {
        insertLesson(req.body.lessonType, req.body.lessonDate, req.body.startTime, req.body.endTime, (err,response) => {
            if (err) return res.status(500).json({ error: "bad request" });
            return res.status(201).json();
        })
    },

    editLesson: (req, res) => {
        updateLesson(req.body.lessonType, req.body.lessonDate, req.body.startTime, req.body.endTime, req.params.id, (err,response) => {
            if (err) return res.status(500).json({ error: "bad request" });
            return res.status(201).json();
        })
    },
};
