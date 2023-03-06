const { selectAllLessonPurchaseTypes } = require("./lessonPurchaseTypesService");

module.exports = {
    getLessonPurchaseTypes: (req, res) => {
        selectAllLessonPurchaseTypes((err, response) => {
            if (err) return res.status(500).json({ error: "bad request" });
            if (response.rows.length < 1)
                return res.status(404).json({ error: "no results" });
            return res.status(200).json({
                lesson_purchase_types: response.rows,
            });
        });
    },
};
