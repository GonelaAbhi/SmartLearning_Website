const mongoose = require('mongoose');

const connection = mongoose.connect("mongodb://localhost:27017/Smart-Learning")

connection.then(() =>
    console.log("SignUp MOdel Connected")
)
.catch((err) =>
    console.log("failed to connect mong db")
);


const StudentsTeachersSchama = new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    role:String,
    profilePic:String
});

const StudentsTeachers = mongoose.model('StudentsTeachers',StudentsTeachersSchama);

module.exports = StudentsTeachers;