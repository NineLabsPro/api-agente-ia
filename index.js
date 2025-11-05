require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

// Express Configuration
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', require('./routes/index'));


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});