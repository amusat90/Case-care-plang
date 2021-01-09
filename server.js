const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');

const users = require('./routes/api/users');

const app = express();

/** Body parser middleware */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/** DB Config */
const db = require('./config/keys').mongoURI;

/** Connect to MongoDB */
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => console.log('MongoDB Connected')).catch(err => console.log(err));

/** Passport middleware*/
app.use(passport.initialize());
app.use(morgan('tiny'));

/** Passport config */
require('./config/passport')(passport);

/** USE Routes */
app.use('/api/users', users);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server running on port ' + port));