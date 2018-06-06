var mongoose = require('mongoose');
var bcrypt = require("bcrypt");




 var pollsSchema = new mongoose.Schema({
     uniqueId: {
         type: String,
         unique: true
     }, //Unique string for url lookup
     username: {
         type: String
     }, //username of creator
     pollTitle: {
         type: String
     }, //Title of the poll
     pollEntries: [{
         type: Array
     }], //array of poll options
     pollVotes: [{
             type: Number
         }] //array of votes per option
 })



var polls  = mongoose.model('polls', pollsSchema);

module.exports = polls;