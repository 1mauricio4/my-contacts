const express = require('express');
const app = express();
const path = require('path');

const connectDB = require('./config/db');

// connect database
connectDB();

// Init middleware
app.use(express.json({ extended: false }));

const users = require('./routes/users');
const auth = require('./routes/auth');
const contacts = require('./routes/contacts');

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/contacts', contacts);

// Server static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`listening on port ${PORT}...`));
