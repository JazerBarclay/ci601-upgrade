require('dotenv').config();

const PORT = process.env.PORT || 4000;

const express = require('express');

const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));

const memberRouter = require('./routes/members/memberRouter');
app.use('/members', memberRouter);

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Ok"
    });
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));