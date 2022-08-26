import { Route, Routes } from 'react-router-dom';

import Login from './pages/login';
import Register from './pages/register';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/register" element={<Register/>}/>
      </Routes>
    </div>
  );
}

export default App;
