const {
    selectAllLessonPurchases,
    insertLessonPurchase,
} = require("./lessonPurchasesService");
const { insertToken } = require("../tokens/tokenService");
const {
    getLessonPriceByIds,
} = require("../lessonPricing/lessonPricingService");
const {
    selectLessonPurchaseTypesById,
} = require("../lessonPurchaseTypes/lessonPurchaseTypesService");

module.exports = {
    //
    returnLessonPurchaseId: (req, res, next) => {
        return res.status(201).json({
            id: req.body.lesson_purchase_id,
        });
    },

    returnAllLessonPurchases: (req, res) => {
        selectAllLessonPurchases((err, response) => {
            if (err) return res.status(500).json({ error: "bad request" });
            if (response.rows.length < 1)
                return res.status(404).json({ error: "no results" });
            return res.status(200).json({
                lesson_purchases: response.rows,
            });
        });
    },

    calculatePurchasePrice: (req, res, next) => {
        if (req.body.total || req.body.total === 0) return next();
        getLessonPriceByIds(
            req.body.lesson_type_id,
            req.body.purchase_type_id,
            (err, response) => {
                if (err)
                    res.status(500).json({
                        message: "failed to calculate price of purchase",
                        error: err,
                    });
                req.body.total = response.rows[0].price;
                return next();
            }
        );
    },

    makeLessonPurchases: (req, res, next) => {
        // Insert purchase with price
        insertLessonPurchase(
            req.body.member_id,
            req.body.lesson_type_id,
            req.body.purchase_type_id,
            req.body.payment_id,
            req.body.total,
            (err, response) => {
                if (err)
                    return res.status(500).json({
                        message: "failed to write to database", error: err
                    });
                req.body.lesson_purchase_id = response.rows[0].id;
                return next();
            }
        );
    },

    generateLessonPurchaseTokens: (req, res, next) => {
        // Get lesson purchase type details
        selectLessonPurchaseTypesById(
            req.body.purchase_type_id,
            (err, response) => {
                if (err)
                    return res.status(500).json({
                        message: "failed to read from database",
                        error: err,
                    });
                if (response.rows.length < 1)
                    return res.status(400).json({ 
                        mesasge: "no lesson type match"
                    });

                // Get today date from midnight
                let tokenDate = new Date(
                    new Date().toISOString().split("T")[0]
                );

                // Prep expiry date
                let expireDate = new Date();

                // Generate tokens based on week and multiplier count
                for (i = 0; i < Number(response.rows[0].weeks); i++) {
                    expireDate.setDate(
                        tokenDate.getDate() + response.rows[0].duration_days
                    );

                    for (j = 0; j < Number(response.rows[0].multiplier); j++) {
                        insertToken(
                            req.body.member_id,
                            req.body.lesson_type_id,
                            req.body.lesson_purchase_id,
                            tokenDate.toISOString().split("T")[0],
                            expireDate.toISOString().split("T")[0],
                            (e) => {
                                if (e)
                                    console.log(
                                        "Failed to generate a token :/"
                                    );
                            }
                        );
                    }
                    tokenDate.setDate(tokenDate.getDate() + 7);
                }

                return next();
            }
        );
    },
};
