const prisma = require('../lib/prisma');

const index = async (req, res) => {
  try {
    const albums = await prisma.album.findMany();

    return res.status(200).json(albums);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao listar álbuns" });
  }
};

const store = async (req, res) => {
  try {
    const { title, artist, genre } = req.body;

    if (!title || typeof title !== "string") {
      return res.status(400).json({ error: "Título é obrigatório" });
    }

    if (!artist || typeof artist !== "string") {
      return res.status(400).json({ error: "Artista é obrigatório" });
    }

    if (!genre || typeof genre !== "string") {
      return res.status(400).json({ error: "Gênero é obrigatório" });
    }

    const album = await prisma.album.create({
      data: { title, artist, genre }
    });

    return res.status(201).json(album);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao criar álbum" });
  }
};

const show = async (req, res) => {
  try {
    const { id } = req.params;

    const albumId = parseInt(id);

    if (isNaN(albumId)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const album = await prisma.album.findUnique({
      where: { id: albumId },
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

    return res.status(200).json(cleanAlbum);
  } catch (error) {
    console.error("Erro no show:", error);
    return res.status(500).json({ error: "Erro ao buscar detalhes do álbum" });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, artist, genre } = req.body;

    const albumId = parseInt(id);

    if (isNaN(albumId)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    if (!title || typeof title !== "string") {
      return res.status(400).json({ error: "Título é obrigatório" });
    }

    if (!artist || typeof artist !== "string") {
      return res.status(400).json({ error: "Artista é obrigatório" });
    }

    if (!genre || typeof genre !== "string") {
      return res.status(400).json({ error: "Gênero é obrigatório" });
    }

    const albumExists = await prisma.album.findUnique({
      where: { id: albumId }
    });

    if (!albumExists) {
      return res.status(404).json({ error: "Álbum não encontrado" });
    }

    const album = await prisma.album.update({
      where: { id: albumId },
      data: { title, artist, genre }
    });

    return res.status(200).json(album);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao atualizar álbum" });
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;

    const albumId = parseInt(id);

    if (isNaN(albumId)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const albumExists = await prisma.album.findUnique({
      where: { id: albumId }
    });

    if (!albumExists) {
      return res.status(404).json({ error: "Álbum não encontrado" });
    }

    await prisma.album.delete({
      where: { id: albumId }
    });

    return res.status(200).json({ message: "Álbum deletado com sucesso" });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao deletar álbum" });
  }
};

module.exports = { index, store, show, update, destroy };