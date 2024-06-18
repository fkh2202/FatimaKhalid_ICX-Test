const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = 3500 || process.env.PORT;

app.use(bodyParser.json());

app.use('/api', require('./routes/webhook'));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
