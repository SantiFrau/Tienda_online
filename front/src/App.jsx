import { useState } from "react";

import { Routes, Route } from "react-router";
import Layout from "./components/layout";
import Products from "./components/productos";
import Login from "./components/login";
import { UserProvider } from "./components/context";
import Notfound from "./components/NotFound";


function App() {
  const [categoria,setCategoria] = useState("all")
  

  
 

  return (
    <>
    <UserProvider>
    <Routes>

       <Route element={<Layout categoria={categoria} setCategoria={setCategoria}></Layout>} path="/">
          
          <Route index element={<Login></Login>}></Route>
          <Route path="/products" element={<Products categoria={categoria}></Products>}></Route>
          <Route path="*" element={<Notfound></Notfound>}></Route>

       </Route>
      
      </Routes>
      </UserProvider>
    </>
  );
}

export default App;

