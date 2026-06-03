const prisma = require('../lib/prisma');

const store = async (req, res) => {
  try {
    const { score, comment, albumId } = req.body;
    const userId = req.userId;

    const parsedScore = parseInt(score);
    const parsedAlbumId = parseInt(albumId);

    if (!userId) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    if (isNaN(parsedAlbumId)) {
      return res.status(400).json({ error: "ID do álbum inválido" });
    }

    if (isNaN(parsedScore)) {
      return res.status(400).json({ error: "Nota inválida" });
    }

    if (parsedScore < 1 || parsedScore > 5) {
      return res.status(400).json({
        error: "A nota deve estar entre 1 e 5 estrelas"
      });
    }

    const album = await prisma.album.findUnique({
      where: { id: parsedAlbumId }
    });

    if (!album) {
      return res.status(404).json({ error: "Álbum não encontrado" });
    }

    const existingReview = await prisma.review.findFirst({
      where: {
        userId: userId,
        albumId: parsedAlbumId
      }
    });

    if (existingReview) {
      return res.status(409).json({
        error: "Você já avaliou este álbum"
      });
    }

    const review = await prisma.review.create({
      data: {
        score: parsedScore,
        comment: comment || null,
        userId: userId,
        albumId: parsedAlbumId
      }
    });

    return res.status(201).json({
      message: "Avaliação enviada com sucesso!",
      review
    });
  } catch (error) {
    console.error("Erro no Review Store:", error);
    return res.status(500).json({
      error: "Erro ao criar avaliação"
    });
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
        id: review.id,
        usuario: review.user.name,
        album: review.album.title,
        nota: review.score,
        comentario: review.comment
      };
    });

    return res.status(200).json(cleanReviews);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar avaliações" });
  }
};

module.exports = { store, index };