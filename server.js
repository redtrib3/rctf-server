const express = require('express');
const cors = require('cors');
const path  = require('path');

const apiRoutes = require('./routes/apiRoutes');
const redirectRoutes = require('./routes/redirects');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


app.use(redirectRoutes);
app.use('/api', apiRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});


app.listen(3000, () => {
    console.log('APP IS LISTENING ON - http://127.0.0.1:3000/');
});
