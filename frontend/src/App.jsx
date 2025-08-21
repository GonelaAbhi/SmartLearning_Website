import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Login.jsx'
import SignUp from './SignUp.jsx'
import HomeStudent from './HomeStudent.jsx'
import HomeTeachers from './HomeTeachers.jsx'
import ViewProfile from "./ViewProfile.jsx";
import EditProfile from "./EditProfile.jsx";
import TeacherPlayList from "./TeacherPlayList.jsx";
import CreatePlayList from "./CreatePlayList.jsx";
import StudentCourses from "./StudentCources.jsx";
import TeacherView from "./TeachersView.jsx";
import SingleTeacherPlayList from "./SingleTeacherPlayList.jsx";
import ViewPlayList from "./ViewPlayList.jsx";
import UploadVideo from "./UploadVideo.jsx";
import ViewPlayListStudent from "./ViewPlayListStudent.jsx";

function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login/>}></Route>
            <Route path="/SignUp" element={<SignUp/>}></Route>
            <Route path="/HomeStudent" element={<HomeStudent/>}></Route>
            <Route path="/HomeTeachers" element={<HomeTeachers />}></Route>
            <Route path="/ViewProfile" element={<ViewProfile />}></Route>
            <Route path="/EditProfile" element={<EditProfile />}></Route>
            <Route path="/TeacherPlayList" element={<TeacherPlayList />}></Route>
            <Route path="/CreatePlayList" element={<CreatePlayList />}></Route>
            <Route path="/StudentCourses" element={<StudentCourses />}></Route>
            <Route path="/TeacherView" element={<TeacherView />}></Route>
            <Route path="/SingleTeacherPlayList/:username" element={<SingleTeacherPlayList />}></Route>
            <Route path="/ViewPlayList/:id" element={<ViewPlayList />}></Route>
            <Route path="/ViewPlayList/:id/UploadVideo" element={<UploadVideo />}></Route>
            <Route path="/ViewPlayListStudent/:id" element={<ViewPlayListStudent />}></Route>









        </Routes>
    </BrowserRouter>
  )
}

export default App
