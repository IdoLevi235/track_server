require ('./models/user')
require ('./models/track')

const express = require('express')
const mongoose = require('mongoose')
const app = express()
const authRoutes = require ('./routes/authRoutes')
const trackRoutes = require ('./routes/trackRoutes')
const requireAuth = require('./middlewares/requireAuth')
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri = 'mongodb+srv://admin:password1234@cluster0.dbwpb.mongodb.net/<dbname>?retryWrites=true&w=majority'
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
})
mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance');
});
mongoose.connection.on('error', (err) => {
    console.err('Error Connecting to mongo instance', err);
});


app.get('/',requireAuth, (req,res) => {
    res.send(`Your Email: ${req.user.email}`);
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
})