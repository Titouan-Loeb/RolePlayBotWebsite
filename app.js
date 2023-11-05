require("dotenv").config();
const express = require('express');
const app = express();
const { EventEmitter } = require('events')
const bodyParser = require('body-parser');
const saveCharacter = require('./public/js/components/form.js');
const { connect, connection } = require('mongoose');
const { db } = require("./public/js/schema/characters.schema.js");
const database_token = process.env.DATABASE_TOKEN

/* ---------- SETUP ---------- */
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));

// set views
app.set('views', './views');
app.set('view engine', 'ejs');

connect(database_token).catch(console.error);

/* ---------- EVENTS ---------- */
const dbEvents = connection;
dbEvents.on('error', (error) => {
    console.error('Database connection error:', error);
})
dbEvents.once('open', () => {
    console.log('Database connected successfully');
})

/* ---------- ROUTES ---------- */
app.use(bodyParser.urlencoded({ extended: true }));
// index
app.get('', (req, res) => {
    res.render('index');
});

// form
app.get('/form', (req, res) => {
    res.render('form');
});
app.post('/form', (req, res) => {
    const formData = req.body;
    saveCharacter(formData);
});

/* ---------- LISTEN ---------- */
app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});