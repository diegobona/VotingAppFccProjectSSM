var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://user1:pass1@ssmongo0-ef6n5.mongodb.net/UserTrack?retryWrites=true')

var connection = mongoose.connection;

connection.on('connected', function(){
console.log('connected to mongo')
})
