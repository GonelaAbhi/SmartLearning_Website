const mongoose = require('mongoose');


const connection = mongoose.connect("mongodb://localhost:27017/Smart-Learning");

connection.then(() => {console.log("PlayList Model connected")})
.catch((err) => {console.log(err)})


const PlayListSchema = new mongoose.Schema({
    username:String,
    PlayListName:String,
    PlayListDescription:String,
    PlayListImage:String,
    PlayListLikes:[{ type: String }]

});

const PlayListModel = new mongoose.model('PlayList',PlayListSchema);

module.exports = PlayListModel;