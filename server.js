// Import dependencies
const express = require('express');
const cookieParser = require('cookie-parser');
const hbs = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');

// Import handlers
const homeHandler = require('./controllers/home');
const roomHandler = require('./controllers/room');

const app = express();
const port = 8080;

// MongoDB connection
const mongoURI = 'mongodb+srv://jmukb001:CS110Password@cluster0.9up6dfg.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup
app.engine('hbs', hbs({ extname: 'hbs', defaultLayout: 'layout', layoutsDir: path.join(__dirname, 'views', 'layouts') }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Routes
app.get('/', homeHandler.getHome);
app.post('/create', homeHandler.createRoom);
app.get('/:roomName/messages', roomHandler.getMessages);
app.post('/:roomName/messages', roomHandler.postMessage);
app.get('/:roomName', roomHandler.getRoom);

// Start server
app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
