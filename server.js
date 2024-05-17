const express = require('express');
const cors = require('cors');
const path  = require('path');

const apiRoutes = require('./routes/apiRoutes');
const redirectRoutes = require('./routes/redirects');
const RedirectSubdomain = require('./middleware/SubdomainRedirect');

const app = express();
const PORT = process.env.PORT || 3000;
const corsAllowList = process.env.ALLOWED_ORIGINS.split(',');
const corsArgs =  { origin: corsAllowList };

app.use(cors(corsArgs));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(RedirectSubdomain);
app.use(redirectRoutes);
app.use('/api', apiRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => {
    console.log(`APP IS LISTENING ON - http://0.0.0.0:${PORT}/`);
});
