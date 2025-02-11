import { useState } from "react";

import { Routes, Route } from "react-router";
import Layout from "./components/layout";
import Products from "./components/productos";
import Login from "./components/login";
import { UserProvider } from "./components/context";
import Notfound from "./components/NotFound";
import User from "./components/user";


function App() {
 
  

  
 

  return (
    <>
    <UserProvider>
    <Routes>

       <Route path="/" index element={<Login></Login>}></Route>

       <Route element={<Layout ></Layout>} path="/products">
          
          
          <Route index element={<Products></Products>}></Route>
          <Route path="user" element={<User></User>}></Route>
          <Route path="cart"></Route>
          <Route path="*" element={<Notfound></Notfound>}></Route>

       </Route>
      
      </Routes>
      </UserProvider>
    </>
  );
}

export default App;

