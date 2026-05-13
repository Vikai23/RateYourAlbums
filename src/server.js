require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

const authRoutes = require('./routes/auth.routes');
const albumRoutes = require('./routes/album.routes');
const reviewRoutes = require('./routes/review.routes');

app.use('/auth', authRoutes);   
app.use('/albums', albumRoutes); 
app.use('/reviews', reviewRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

