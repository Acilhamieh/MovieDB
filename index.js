const express = require('express');

const app = express();
const PORT = 3000;

// Define a basic route that responds to all URLs
app.use((req, res) => {
    res.send('ok');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});