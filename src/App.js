import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import { useEffect, useState } from "react";
import './App.css';
import DisplayItems from './DisplayItems';
import LogUser from "./LogUser";
import EditData from "./EditData";
import EditItem from "./EditItem";
import Home from "./Home";
// this is sparta
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState();

  // the hook is updated every time the "isLoggedIn" variable changes
  useEffect(()=>{
      // "isLoggedIn" variable is retrieved from the local storage
      const localstorageGetInformation = localStorage.getItem('isLoggedIn')
       
       // if the user is logged in the value is set to "1"
       if(localstorageGetInformation === '1'){
         setIsLoggedIn(true)
         localStorage.setItem('isLoggedIn','1')
       }
     },[isLoggedIn])

  // when the user clicks the log out button   
  const Logout = () => {
    localStorage.setItem('isLoggedIn','0');
    setIsLoggedIn(false);
    window.location.replace('/login'); 
  }

  // navbar style
  const navBarr = {
    display: "flex",
    flexDirection: "row",
    margin: "5vh",
  }

  return (
    <div> 
      <BrowserRouter>
        {isLoggedIn ? (
          <nav style={navBarr}>
            <Link className='navItemHome' to="/home">Home</Link>
            <Link className='navItem' to="/list">Product List</Link>
            <Link className='navItem' onClick={Logout}>Log Out</Link>
          </nav>
        ) : 
        (
          <Routes>
            <Route path="/login" element={<LogUser logged={setIsLoggedIn} />} />
          </Routes>
        )}
        {isLoggedIn && (
          <div className="Login">
            <Routes>
              <Route path="/home" element={<Home/>} />
              <Route path="/list" element={<DisplayItems />} />
              <Route path="/edit-data" element={<EditData />} />
              <Route path={`/edit-item/:id`} element={<EditItem />} />
            </Routes>
          </div>
        )}
      </BrowserRouter>
    </div>

  );
}

export default App;