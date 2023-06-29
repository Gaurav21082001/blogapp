import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/home';
import Navbar from './components/Navbar';
import NewBlog from './components/NewBlog';
import Profile from './components/Profile';

  import { ToastContainer } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";

import Myblog from './components/Myblog';
import EditUser from './components/EditUser';
import EditBlog from './components/EditBlog';

function App() {
 return (
    <div className="container">
      <Navbar />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='home' element={<Home />} />
        <Route path='new-blog' element={<NewBlog />} />
        <Route path='profile' element={<Profile />} />
       
       
        <Route path='my-blog' element={<Myblog/>}/> 
        <Route path='profile/edit-user/:id' element={<EditUser/>}/> 
        <Route path='my-blog/edit-blog/:id' element={<EditBlog/>}/> 
      </Routes>
      <ToastContainer/>
    </div>
  );
}

export default App;
