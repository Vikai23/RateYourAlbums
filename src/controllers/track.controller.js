const prisma = require('../lib/prisma');

const index = async (req, res) => {
  try {
    const tracks = await prisma.track.findMany({
      orderBy: {
        trackNumber: 'asc'
      },
      include: {
        album: {
          select: {
            title: true
          }
        }
      }
    });

    return res.status(200).json(tracks);
  } catch (error) {
    return res.status(500).json({
      error: "Erro ao listar músicas"
    });
  }
};

const store = async (req, res) => {
  try {
    const { title, trackNumber, albumId } = req.body;

    if (!title || typeof title !== "string") {
      return res.status(400).json({
        error: "Título é obrigatório"
      });
    }

    if (!trackNumber) {
      return res.status(400).json({
        error: "Número da faixa é obrigatório"
      });
    }

    if (!albumId) {
      return res.status(400).json({
        error: "Álbum é obrigatório"
      });
    }

    const parsedTrackNumber = parseInt(trackNumber);
    const parsedAlbumId = parseInt(albumId);

    if (isNaN(parsedTrackNumber) || parsedTrackNumber < 1) {
      return res.status(400).json({
        error: "Número da faixa inválido"
      });
    }

    const album = await prisma.album.findUnique({
      where: {
        id: parsedAlbumId
      }
    });

    if (!album) {
      return res.status(404).json({
        error: "Álbum não encontrado"
      });
    }

    const existingTrack = await prisma.track.findFirst({
      where: {
        albumId: parsedAlbumId,
        trackNumber: parsedTrackNumber
      }
    });

    if (existingTrack) {
      return res.status(409).json({
        error: "Já existe uma faixa com esse número neste álbum"
      });
    }

    const track = await prisma.track.create({
      data: {
        title,
        trackNumber: parsedTrackNumber,
        albumId: parsedAlbumId
      }
    });

    return res.status(201).json(track);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Erro ao criar faixa"
    });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, trackNumber, albumId } = req.body;

    const trackId = parseInt(id);

    if (isNaN(trackId)) {
      return res.status(400).json({
        error: "ID da faixa inválido"
      });
    }

    if (!title || typeof title !== "string") {
      return res.status(400).json({
        error: "Título é obrigatório"
      });
    }

    if (!trackNumber) {
      return res.status(400).json({
        error: "Número da faixa é obrigatório"
      });
    }

    if (!albumId) {
      return res.status(400).json({
        error: "Álbum é obrigatório"
      });
    }

    const parsedTrackNumber = parseInt(trackNumber);
    const parsedAlbumId = parseInt(albumId);

    if (isNaN(parsedTrackNumber) || parsedTrackNumber < 1) {
      return res.status(400).json({
        error: "Número da faixa inválido"
      });
    }

    if (isNaN(parsedAlbumId)) {
      return res.status(400).json({
        error: "ID do álbum inválido"
      });
    }

    const trackExists = await prisma.track.findUnique({
      where: {
        id: trackId
      }
    });

    if (!trackExists) {
      return res.status(404).json({
        error: "Faixa não encontrada"
      });
    }

    const album = await prisma.album.findUnique({
      where: {
        id: parsedAlbumId
      }
    });

    if (!album) {
      return res.status(404).json({
        error: "Álbum não encontrado"
      });
    }

    const existingTrackNumber = await prisma.track.findFirst({
      where: {
        albumId: parsedAlbumId,
        trackNumber: parsedTrackNumber,
        NOT: {
          id: trackId
        }
      }
    });

    if (existingTrackNumber) {
      return res.status(409).json({
        error: "Já existe outra faixa com esse número neste álbum"
      });
    }

    const updatedTrack = await prisma.track.update({
      where: {
        id: trackId
      },
      data: {
        title,
        trackNumber: parsedTrackNumber,
        albumId: parsedAlbumId
      }
    });

    return res.status(200).json({
      message: "Faixa atualizada com sucesso",
      track: updatedTrack
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Erro ao atualizar faixa"
    });
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;

    const trackId = parseInt(id);

    if (isNaN(trackId)) {
      return res.status(400).json({
        error: "ID da faixa inválido"
      });
    }

    const trackExists = await prisma.track.findUnique({
      where: {
        id: trackId
      }
    });

    if (!trackExists) {
      return res.status(404).json({
        error: "Faixa não encontrada"
      });
    }

    await prisma.track.delete({
      where: {
        id: trackId
      }
    });

    return res.status(200).json({
      message: "Faixa deletada com sucesso"
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Erro ao deletar faixa"
    });
  }
};

module.exports = {
  index,
  store,
  update,
  destroy
};