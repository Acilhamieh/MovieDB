//exporting the express library
const express = require('express');
//create
const app = express();
const PORT = 3000;

// Define a basic route that responds to all URLs
//req=>request and res=>response
app.use((req, res) => {
    res.send('ok');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
//route for test
app.get('/test', (req, res) => {
    res.json({ status: 200, message: "ok" });
});
//route for time
const moment = require('moment'); // For formatting the time
app.get('/time', (req, res) => {
    const currentTime = moment().format('HH:mm');
    res.json({ status: 200, message: currentTime });
});