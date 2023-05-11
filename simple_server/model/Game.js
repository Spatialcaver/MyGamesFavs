const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Game = new Schema({
  nome: {
    type: String
  },
  ano: {
    type: String
  },
 
  genero: {
    type: String
  }
},{
    collection: 'game'
});

module.exports = mongoose.model('Game', Game);