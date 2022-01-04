
import './App.css';
import Header from './components/Header'
import Login from './components/Login'
import Profile from './components/Profile'
import Register from './components/Register'
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";

function App() {
  return (
    <Router>
    <div className="App">
      <Header />
      <Routes>
        <Route exact  path='/' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/profile' element={<Profile/>} />
      </Routes>
      {/* <Login />
      <Register />
      <Profile /> */}
    </div>
    </Router>
  );
}

export default App;
