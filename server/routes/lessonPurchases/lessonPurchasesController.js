const { selectAllLessonPurchases } = require("./lessonPurchasesService");

module.exports = {
    getLessonPurchases: (req, res) => {
        selectAllLessonPurchases((err, response) => {
            if (err) return res.status(500).json({ error: "bad request" });
            if (response.rows.length < 1)
                return res.status(404).json({ error: "no results" });
            return res.status(200).json({
                lesson_purchases: response.rows,
            });
        });
    },
};
