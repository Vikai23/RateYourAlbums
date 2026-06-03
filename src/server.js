require('dotenv').config();

const express = require('express');
const app = express();

app.use(express.json());

const authRoutes = require('./routes/auth.routes');
const albumRoutes = require('./routes/album.routes');
const reviewRoutes = require('./routes/review.routes');
const trackRoutes = require('./routes/track.routes');

app.get('/', (req, res) => {
  return res.status(200).json({
    message: 'RateYourAlbums API funcionando',
    rotas: {
      auth: '/auth',
      albums: '/albums',
      reviews: '/reviews',
      tracks: '/tracks'
    }
  });
});

app.use('/auth', authRoutes);
app.use('/albums', albumRoutes);
app.use('/reviews', reviewRoutes);
app.use('/tracks', trackRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});