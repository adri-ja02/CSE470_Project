const express = require('express');
const cors = require('cors');

const internshipRoutes = require('./routes/internshipRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// USE ROUTES
app.use('/', internshipRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
