require("dotenv").config();

const PORT = process.env.PORT || 4000;

const express = require("express");
const app = express();

const cors = require("cors");

app.use(
    cors({
        origin: "*",
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const loginRouter = require("./routes/login/loginRouter");
app.use("/login", loginRouter);

const memberRouter = require("./routes/members/memberRouter");
app.use("/members", memberRouter);

const paymentMethodsRouter = require("./routes/paymentMethods/paymentMethodsRouter");
app.use("/paymentMethods", paymentMethodsRouter);

const paymentRouter = require("./routes/payments/paymentRouter");
app.use("/payments", paymentRouter);

const lessonRouter = require("./routes/lessons/lessonRouter");
app.use("/lessons", lessonRouter);

const lessonTypesRouter = require("./routes/lessonTypes/lessonTypesRouter");
app.use("/lessonTypes", lessonTypesRouter);

const lessonPricingRouter = require("./routes/lessonPricing/lessonPricingRouter");
app.use("/lessonPricing", lessonPricingRouter);

const lessonPurchaseTypesRouter = require("./routes/lessonPurchaseTypes/lessonPurchaseTypesRouter");
app.use("/lessonPurchaseTypes", lessonPurchaseTypesRouter);

const lessonPurchasesRouter = require("./routes/lessonPurchases/lessonPurchasesRouter");
app.use("/lessonPurchases", lessonPurchasesRouter);

const attendanceRouter = require("./routes/attendance/attendanceRouter");
app.use("/attendance", attendanceRouter);

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Ok",
    });
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
