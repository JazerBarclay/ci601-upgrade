const { selectAllLessonTypes } = require("./lessonTypesService");

module.exports = {
    returnAllLessonTypes: (req, res) => {
        selectAllLessonTypes((err, response) => {
            if (err) return res.status(500).json({ message: "failed to read database", error: err });
            if (response.rows.length < 1)
                return res.status(404).json({ message: "no results" });
            return res.status(200).json({
                lesson_types: response.rows,
            });
        });
    },
};
