const express = require('express');
const cors = require('cors');
// const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SignUpModel = require('./models/SignUpModel')
const PlayListModel = require('./models/PlayListModel');
const VideoModel = require('./models/VideosModel')
const path = require('path');
const multer = require('multer');
const fs = require("fs");




const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));




//This storage for Profie Pict

const storageProfile = multer.diskStorage({
  destination:  (req, file, cb) => {
    cb(null, 'uploads/profiles');
  },
  filename:  (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix); 
  }
}); 


const profile = multer({storage:storageProfile})

//This storage for Upload video

const storageVideo = multer.diskStorage({
  destination:  (req, file, cb) => {
    cb(null, 'uploads/videos');
  },
  filename:  (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-video' + file.originalname;
    cb(null, uniqueSuffix); 
  }
}); 


const video = multer({storage:storageVideo})


//This for Store Tumbnails


const storageTumbnails = multer.diskStorage({
  destination:  (req, file, cb) => {
    cb(null, 'uploads/tumbnails');
  },
  filename:  (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-Tumbnail' + file.originalname;
    cb(null, uniqueSuffix); 
  }
}); 


const Tumbnails = multer({storage:storageTumbnails})


app.post('/SignUp',profile.single('profilePic'), async (req,res)=>{
    try{
        const { username, email, password, role } = req.body;
        const profilePic = req.file ? `/uploads/profiles/${req.file.filename}` : '/uploads/profiles/default.jpeg';
        const existenceOfUser = await SignUpModel.findOne({username});

        if(existenceOfUser){
            return res.json({message:"User already exists"});
        }

        const hashPassword = await bcrypt.hash(password ,10);

        const user = await SignUpModel.create({username,email,password : hashPassword,role,profilePic});

        if(user){
            return res.json({message:"User created successfully"});
        }


        // const insert = SignUpModel.create(req.body)
        
    }
    catch(err){
        console.log(err);
    }
})



app.post('/Login', async (req,res) =>{
    try{
        const {username,password} = req.body;
        const user = await SignUpModel.findOne({username});
        if(!user){
            return res.json({message:"User not found"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(isMatch){
            return res.json({message:"Login sucessfully",success : true,user:user.username,role:user.role});
        }  
        else{
            return res.json({message:"Invalid password",success : false});
        }
    }
    catch(err){
        console.log(err);
    }
})




//fetching user data

app.get('/getProfile/:username',async (req,res) => {
    try{
        const { username } = req.params;
        const userData = await SignUpModel.findOne({username});
         if (!userData) return res.json({ message: 'User not found' });
        res.json({ user:userData });
    }
    catch(err){
        console.log(err);
    }

})


//update the data

app.put('/updateProfile/:username', profile.single('profilePic'),async (req,res) =>{
    const {username} = req.params;
    const {email,password} = req.body;

    try{
        const user = await SignUpModel.findOne({ username });
        if(email){
            user.email = email;
        }
        if(password){
            const newPassword = await bcrypt.hash(password ,10);
            user.password = newPassword;
        }

        if (req.file) {
            user.profilePic = '/uploads/profiles/' + req.file.filename;
        }
        await user.save();

        res.json({message:"user updated sucessfully"});
    }
    catch(err){
        console.log(err);
    }

})


//create playlist backend code

app.post('/CreatePlayList',Tumbnails.single('PlayListImage'),async (req,res) =>{
    try{
        const {username,PlayListName,PlayListDescription} = req.body;
        const Tumbnail = req.file ? `/uploads/tumbnails/${req.file.filename}` : '/uploads/tumbnails/defaultTumb.jpeg';
        const CreatePlayList = await PlayListModel.create({username:username,
            PlayListName:PlayListName,
            PlayListDescription:PlayListDescription,
            PlayListImage:Tumbnail
        });
        console.log(username,PlayListName,PlayListDescription);
        res.json({CreatePlayList,message:"created sucessfully"});
    }
    catch(err){
        console.log(err);
    }
})

//fetch playListts created by one teacher 

app.get('/GetPlayList/:username',async (req,res) =>{
    try{
        const {username} = req.params;
        const playLists = await PlayListModel.find({username:username});
        res.json(playLists);
    }
    catch(err){
        console.log(err);
    }

});

//get All playlist from datatbase


app.get('/getPlayLists',async (req,res) =>{
    try{
        const data = await PlayListModel.find();
        res.json(data);
    }
    catch(err){
        console.log(err);
    }
});


//display all the teachers

app.get('/getAllTeachers',async (req,res) =>{
    try{
        const allTeachers = await SignUpModel.find({role:'teacher'});
        res.json(allTeachers);
    }
    catch(err){
        console.log(err);
    }
});


//get playList by teacher 

app.get('/getPlaylistsByTeacher/:username',async (req,res)=>{
    try{
        const {username} = req.params;
        const playLists = await PlayListModel.find({username:username});
        res.json(playLists);
    }
    catch(err){
        console.log(err);
    }
})

//get playList by id 

app.get('/getPlaylistById/:id',async (req,res) =>{
    try{
        const {id} = req.params;
        const playList = await PlayListModel.findById(id);
        res.json(playList);
        }
    catch(err){
        console.log(err);
    }

})

//upolad videos in videoos model

app.post('/uploadVideo',video.single('videoUrl'),async (req,res) =>{
    try{
    
        const { playlistId ,videoTitle,videoDescription} = req.body;
        const videoUrl = `/uploads/videos/${req.file.filename}`;
        const uploaded = await VideoModel.create({playlistId,videoTitle,videoUrl,videoDescription});

        res.json({uploaded,message:"video uploaded sucessfully"})

    }
    catch(err){
        console.log(err);
    }
})

//get videos from playlist

app.get('/getPlaylistByIdVideos/:id',async (req,res) =>{
    try{
        const {id} = req.params;
        const videos = await VideoModel.find({playlistId:id});
        res.json(videos);
    }
    catch(err){
        console.log(err);
    }
})


//like and unlike video


app.put("/videos/like/:videoId", async (req, res) => {
  try {
    const { videoId } = req.params;
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    const video = await VideoModel.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Toggle like
    if (video.likedBy.includes(username)) {
      // Unlike
      video.likedBy = video.likedBy.filter((user) => user !== username);
      video.likes = Math.max(0, video.likes - 1);
    } else {
      // Like
      video.likedBy.push(username);
      video.likes += 1;
    }

    await video.save();

    res.json({
      message: "Like status updated",
      likes: video.likes,
      likedBy: video.likedBy
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


//Adding comments to video 

// Add a comment to a video
app.put("/videos/comment/:videoId", async (req, res) => {
  try {
    const { username, text } = req.body;

    if (!username || !text) {
      return res.status(400).json({ error: "Username and text are required" });
    }

    const video = await VideoModel.findById(req.params.videoId);
    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }

    video.comments.push({ username, text });
    await video.save();

    res.json({ comments: video.comments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});



//video playing


// app.get("/uploads/videos/:filename", (req, res) => {
//   const filePath = path.join(__dirname, "uploads/videos", req.params.filename);

//   fs.stat(filePath, (err, stats) => {
//     if (err) {
//       console.error(err);
//       return res.status(404).send("File not found");
//     }

//     const range = req.headers.range;
//     if (!range) {
//       res.writeHead(200, {
//         "Content-Length": stats.size,
//         "Content-Type": "video/mp4",
//       });
//       return fs.createReadStream(filePath).pipe(res);
//     }

//     const videoSize = stats.size;
//     const CHUNK_SIZE = 10 ** 6; // 1MB
//     const start = Number(range.replace(/\D/g, ""));
//     const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

//     const contentLength = end - start + 1;
//     const headers = {
//       "Content-Range": `bytes ${start}-${end}/${videoSize}`,
//       "Accept-Ranges": "bytes",
//       "Content-Length": contentLength,
//       "Content-Type": "video/mp4",
//     };

//     res.writeHead(206, headers);
//     fs.createReadStream(filePath, { start, end }).pipe(res);
//   });
// });






app.listen(3001,()=>{
    console.log("server is running on port 3001");
})