const prisma = require('../lib/prisma');

const index = async (req, res) => {
  try {
    const albums = await prisma.album.findMany();
    res.json(albums);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar álbuns" });
  }
};

const store = async (req, res) => {
  try {
    const { title, artist, genre } = req.body;
    const album = await prisma.album.create({
      data: { title, artist, genre }
    });
    res.status(201).json(album);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar álbum" });
  }
};

const show = async (req, res) => {
  try {
    const { id } = req.params;

    const album = await prisma.album.findUnique({
      where: { id: parseInt(id) },
      include: {
        reviews: {
          include: {
            user: { select: { name: true } }
          }
        }
      }
    });

    if (!album) {
      return res.status(404).json({ error: "Álbum não encontrado" });
    }

    const cleanAlbum = {
      id: album.id,
      titulo: album.title,
      artista: album.artist,
      genero: album.genre,
      avaliacoes: album.reviews?.map(rev => ({
        usuario: rev.user?.name || "Usuário desconhecido",
        nota: rev.score,
        comentario: rev.comment
      })) || []
    };

    res.json(cleanAlbum);
  } catch (error) {
    console.error("Erro no show:", error); 
    res.status(500).json({ error: "Erro ao buscar detalhes do álbum" });
  }
};

module.exports = { index, store, show };