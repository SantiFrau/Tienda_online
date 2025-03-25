import { Routes, Route } from "react-router";
import Layout from "./components/layout";
import Products from "./components/productos";
import Login from "./components/login";
import { UserProvider } from "./components/context";
import Notfound from "./components/NotFound";
import User from "./components/user";
import Cart from "./components/cart";
import Register from "./components/register";


function App() {
 
  

  
 

  return (
    <>
    <UserProvider>
    <Routes>

       <Route path="/" index element={<Login></Login>}></Route>
       <Route path="/register" index element={<Register></Register>}></Route>

       <Route element={<Layout ></Layout>} path="/products">
          
          
          <Route index element={<Products></Products>}></Route>
          <Route path="user" element={<User></User>}></Route>
          <Route path="cart" element={<Cart></Cart>}></Route>
          <Route path="*" element={<Notfound></Notfound>}></Route>

       </Route>
      
      </Routes>
      </UserProvider>
    </>
  );
}

export default App;

