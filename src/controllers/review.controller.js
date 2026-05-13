const prisma = require('../lib/prisma');


const store = async (req, res) => {
  try {
    const { score, comment, albumId } = req.body;
    const userId = req.userId; 

    const review = await prisma.review.create({
      data: {
        score: parseInt(score),
        comment,
        userId: userId,
        albumId: parseInt(albumId)
      }
    });

    res.status(201).json({ message: "Avaliação enviada com sucesso!", review });
  } catch (error) {
    console.error("Erro no Review Store:", error);
    res.status(400).json({ error: "Erro ao criar avaliação. Verifique se o ID do álbum está correto." });
  }
};

const index = async (req, res) => {
  try {
    const reviews = await prisma.review.findMany({
      include: {
        user: { select: { name: true } },
        album: { select: { title: true } }
      }
    });


    const cleanReviews = reviews.map(review => {
      return {
        usuario: review.user.name,
        album: review.album.title,
        nota: review.score,
        comentario: review.comment
      };
    });

    res.json(cleanReviews);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar avaliações" });
  }
};
module.exports = { store, index };