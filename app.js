const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const getsRoute = require('./routes/gets');
const patchsRoute = require('./routes/patch');
const dotenv = require('dotenv');

//Import Routes
const postsRoute = require('./routes/posts');

const app = express()

dotenv.config();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// MIDDLEWARE
app.use('/posts', postsRoute);
app.use('/gets', getsRoute);
app.use('/patch', patchsRoute);



//ROUTES
app.get('/', (req, res) => {
    res.send('Backend Home');
});

//Connect to MongoDB
// mongoose.connect(
//     process.env.DB_CONNECTION,
//     { useNewUrlParser: true },
//     () => console.log('connected to mongo')
// )


const PORT = process.env.PORT || 8080;

//Connect to MongoDB
mongoose.connect(
    process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log('Server is running on Port: http://localhost:${PORT}')))
    .catch((error) => console.log(`${error} did not connect`));

//Listen to the server
// app.listen(8080);