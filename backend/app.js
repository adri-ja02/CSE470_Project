const express = require('express');

const cors = require('cors');

const internshipRoutes =
require('./routes/internshipRoutes');

const applicationRoutes =
require('./routes/applicationRoutes');

const app = express();

app.use(cors());

app.use(express.json());


// STATIC CV ACCESS
app.use(
    '/uploads',
    express.static('uploads')
);


// ROUTES
app.use(
    '/internships',
    internshipRoutes
);

app.use(
    '/applications',
    applicationRoutes
);


app.listen(5000, () => {

    console.log(
        'Server running on port 5000'
    );
});