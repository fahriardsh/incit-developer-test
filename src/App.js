import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Login from './components/Login'
import Dashboard from "./components/Dashboard";

function App() {
  // return (
  //   <div>
  //     <Login></Login>
  //   </div>
  // );
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
