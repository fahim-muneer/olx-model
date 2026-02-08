import React from 'react'
import Home from './components/pages/Home'
import Navbar from './components/pages/Navbar'
import { Route, Routes } from 'react-router-dom'
import Details from './Details/Details'
import Cart from './components/pages/Cart'
import Checkout from './components/pages/Checkout'
import Profile from './components/pages/Profile'
import Login from './components/Modal/Login'
import Sell from './components/Modal/Sell'
import Protected from './components/ProtectRoute/Protected'
// =====================
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./components/Firebase/Firebase";
import { setUser } from "./Redux/AuthSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
function App() {
    const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser({
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photo: user.photoURL
        }));
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
     
      <Navbar/>
      <Login />
      <Sell />
       <div className="pt-20">
      <Routes>
        <Route path='/' element={ <Home/>}/>
        <Route path="/details/:id" element={<Details/>}/>

        <Route element={<Protected/>}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        </Route>
        

      </Routes>
      </div>
    </div>
  )
}

export default App
