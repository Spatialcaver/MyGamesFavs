const express = require('express');
const app = express();
const gameRoutes = express.Router();

let Games = require('../model/Game');

// api to add game
gameRoutes.route('/add').post(function (req, res) {
  let game = new Games(req.body);
  game.save()
  .then(game => {
    res.status(200).json({'status': 'success','mssg': 'game added successfully'});
  })
  .catch(err => {
    res.status(409).send({'status': 'failure','mssg': 'unable to save to database'});
  });
});

// api to get games
gameRoutes.route('/').get(function (req, res) {
  Games.find(function (err, games){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','games': games});
    }
  });
});

// api to get game
gameRoutes.route('/game/:id').get(function (req, res) {
  let id = req.params.id;
  Games.findById(id, function (err, game){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','game': game});
    }
  });
});

// api to update route
gameRoutes.route('/update/:id').put(function (req, res) {
    Games.findById(req.params.id, function(err, game) {
    if (!game){
      res.status(400).send({'status': 'failure','mssg': 'Unable to find data'});
    } else {
        game.name = req.body.name;
        game.ano = req.body.ano;
        game.genero = req.body.genero;

        game.save().then(business => {
          res.status(200).json({'status': 'success','mssg': 'Update complete'});
      })
    }
  });
});

// api for delete
gameRoutes.route('/delete/:id').delete(function (req, res) {
  Games.findByIdAndRemove({_id: req.params.id}, function(err,){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','mssg': 'Delete successfully'});
    }
  });
});

module.exports = gameRoutes;