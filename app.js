const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
dotenv.config();



// Connect to MongoDB
mongoose.connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB:', error);
    });





// Define your routes and middleware
const app = express();
app.use(express.json());
app.use('/auth', require('./routes/auth'));

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
