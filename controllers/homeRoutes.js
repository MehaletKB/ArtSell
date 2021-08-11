const router = require('express').Router();
const { Artwork, User } = require('../models');

router.get('/', async(req, res) => {


})


router.get('/artwork/:id', async (req, res) => {
  try{
    const artworkData = await Artwork.findByPk(req.params.id, {
      inculde: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
    const artwork = artworkData.get ({ plain: true});
    res.render('artwork', {
      ... artwork
    });
  }
})