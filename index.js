import express from 'express';
import startConfig from './startup/config.js';
import startDB from './startup/DB.js';
import startLogging from './startup/logging.js';
// import startRoutes from './startup/routes.js';

const app = express();

startConfig();
startDB();
startLogging();
// startRoutes(app);

app.get('/', (req, res) => {
    res.send('Welcom to Shortify APP');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Srever is running on http://localhost:${PORT}`);
});
