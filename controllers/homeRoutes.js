const router = require('express').Router();
const { Artwork, User } = require('../models');

router.get('/', async(req, res) => {


})


router.get('/artwork/:id', async (req, res) => {
  //if user is logged in , track their views
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
});

router.post('/artwork/:id', async (req, res) => {//add to cart
 // get user from req.session.user
 //get art from req.paramas.id
  //update purchase to is_In_Cart
})

router.get('/cart', (req, res) => {
  //send back data for all purchases is_IN_Cart
})
router.post('/cart')//update purchases to bought

router.get('/login', (req, res) => {

});