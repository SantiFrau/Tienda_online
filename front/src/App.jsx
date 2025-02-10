import { useState } from "react";

import { Routes, Route } from "react-router";
import Nav from "./components/nav";
import Products from "./components/productos";
import ProdSelected from "./components/selectProduct";

function App() {
  const [categoria,setCategoria] = useState("all")
  const [prodSelected, setProdSelected] = useState(false);

  

 


  




 

  return (
    <>
      <div className="w-full flex items-center justify-center flex-col ">

         <Nav categoria={categoria} setCategoria={setCategoria}></Nav>

        <Products categoria={categoria } setProdSelected={setProdSelected}></Products>



        <ProdSelected prodSelected={prodSelected} setProdSelected={setProdSelected}></ProdSelected>

      </div>
    </>
  );
}

export default App;

