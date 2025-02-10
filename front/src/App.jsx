import { useState } from "react";

import { Routes, Route } from "react-router";
import Layout from "./components/layout";
import Products from "./components/productos";
import Login from "./components/login";


function App() {
  const [categoria,setCategoria] = useState("all")
  

  
 

  return (
    <>
    <Routes>

       <Route element={<Layout categoria={categoria} setCategoria={setCategoria}></Layout>} path="/">
          
          <Route index element={<Login></Login>}></Route>
          <Route path="/products" element={<Products categoria={categoria}></Products>}></Route>

       </Route>
      
      </Routes>
    </>
  );
}

export default App;

