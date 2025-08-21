const mongoose = require('mongoose');

const connection = mongoose.connect("mongodb://localhost:27017/Smart-Learning");

connection
  .then(() => { console.log("VideoModel connected successfully"); })
  .catch(() => { console.log("Connection failed"); });

const VideoSchema = mongoose.Schema({
  playlistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PlayList',
    required: true
  },
  videoTitle: String,
  videoUrl: String,
  videoDescription: String,
  likes: { type: Number, default: 0 },
  likedBy: { type: [String], default: [] }, // ✅ store usernames who liked
  comments: [{
    username: String,
    text: String,
    timestamp: { type: Date, default: Date.now }
  }]
});

const VideoModel = mongoose.model('Video', VideoSchema);

module.exports = VideoModel;
