import { Route, Routes, Navigate } from 'react-router-dom';

import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';

import Profil from './pages/profile';

import LowonganList from './pages/lowongan/list';
import LowonganDetail from './pages/lowongan/detail';

import ListKegiatan from './pages/kegiatan/list';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        {/* <Route exact path="/" element={<Navigate replace to="/login"/>}/> */}
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/register" element={<Register/>}/>

        <Route exact path="/profil" element={<Profil/>}/>

        <Route exact path="/lowongan" element={<LowonganList/>}/>
        <Route exact path="/lowongan/:kode" element={<LowonganDetail/>}/>

        <Route exact path="/kegiatan" element={<ListKegiatan/>}/>
      </Routes>
    </div>
  );
}

export default App;
