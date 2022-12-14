import React from "react";
import { Route, Routes, Navigate } from 'react-router-dom';

import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';

import Profil from './pages/profile';

import LowonganList from './pages/lowongan/list';
import LowonganDetail from './pages/lowongan/detail';

import ListKegiatan from './pages/kegiatan/list';
import KegiatanDetail from "./pages/kegiatan/detail";

import { UserContext } from "./services/user-context";
import CreateLowongan from "./pages/lowongan/create/createform";
import MyLowonganList from "./pages/lowongan/my";
import EditLowongan from "./pages/lowongan/detail/editform";

function AppRoutes() {
  const {token} = React.useContext(UserContext);

  React.useEffect(() => {
    document.title = "CariGawe"
  }, [])
  
  if (token || localStorage.getItem('token')) {
    return (
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/profil" element={<Profil/>}/>
          <Route exact path="/lowongan" element={<LowonganList/>}/>
          <Route exact path="/lowongan/:kode" element={<LowonganDetail/>}/>          
          <Route exact path="/lowongan/buat" element={<CreateLowongan/>}/>
          <Route exact path="/lowongan/:kode/edit" element={<EditLowongan/>}/>
          <Route exact path="/lowongan/saya" element={<MyLowonganList/>}/>
          <Route exact path="/kegiatan" element={<ListKegiatan/>}/>
          <Route exact path="/kegiatan/:kode" element={<KegiatanDetail/>}/> 
        </Routes>
      </div>
    );
  }
  else {
    return (
      <div className="App">
        <Routes>
          <Route exact path="*" element={<Navigate replace to="/login"/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/register" element={<Register/>}/>
        </Routes>
      </div>
    );
  }
}

export default AppRoutes;
