const { selectAllLessonPurchaseTypes } = require("./lessonPurchaseTypesService");

module.exports = {
    getLessonPurchaseTypes: (req, res) => {
        selectAllLessonPurchaseTypes((err, response) => {
            if (err) return res.status(500).json({ error: "failed to read database" });
            if (response.rows.length < 1)
                return res.status(404).json({ message: "no results" });
            return res.status(200).json({
                lesson_purchase_types: response.rows,
            });
        });
    },
};
