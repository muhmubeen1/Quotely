const express = require('express');
const cors = require('cors');
require('dotenv').config();
const bookRoutes = require('./routes/books');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/books', bookRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
