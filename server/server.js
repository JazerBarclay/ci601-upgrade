const PORT = 4000;
const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Ok"
    });
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));