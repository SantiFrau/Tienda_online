import { createContext, useState, useEffect } from "react";
import { createCart, get_cart, updateCart} from "../get_prod";


export const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState();
    const [categoria,setCategoria] = useState("all")
    const [search,setSearch] = useState("")
    const [cart, setCart] = useState({});
    const [existCart,setExistCart] = useState(false)
     
    function addCart(id, resta = false) {
        // Verifica si el producto ya está en el carrito
        const existingProduct = cart.products.find(prod => prod.product_id === id);
    
        let newCart;
    
        if (existingProduct) {
            // Si el producto ya existe incrementa o decrementa su cantidad
            newCart = {
                ...cart,
                products: cart.products.map(prod => 
                    prod.product_id === id
                        ? { 
                            ...prod, 
                            quantity: resta ? prod.quantity - 1 : prod.quantity + 1 
                        } 
                        : prod
                )
            };
    
            // Si la cantidad llega a 0 elimina el producto del carrito
            if (resta && existingProduct.quantity === 1) {
                newCart = {
                    ...newCart,
                    products: newCart.products.filter(prod => prod.product_id !== id)
                };
            }
        } else {
            // Si el producto no existe agrega
            newCart = {
                ...cart,
                products: [
                    ...cart.products,
                    { product_id: id, quantity: 1 }
                ]
            };
        }
    
        setCart(newCart);
        
    }

    async function saveCart(){
        
        
        if(!existCart){
            const data = {
                products:cart.products,
                user_id:user.id
            }
            console.log(data)

           try{
            const res = await createCart(data)
           }catch(error){
            console.log("no se pudo crear el carrito")
           }

        }else{
            try{
                const res = await updateCart(cart)
               }catch(error){
                console.log("no se pudo actualizar el carrito")
               }
        }
    }
    
    

    async function get_carts() {
        if (!user || !user.id) return;
    
        let c;
        try {
            // Llamamos a la función get_cart y manejamos su resultado
            c = await get_cart(user.id);
    
            if (!c) {
                setCart({
                    products:[]
                })
                setExistCart(false);
                return;
            }
    
            // Si existe el carrito, actualizamos el estado
            setExistCart(true);
            setCart(c);
        } catch (error) {
            // Manejo de errores en caso de fallo en la función get_cart
            setExistCart(false);
            console.log("Error al intentar obtener el carrito:", error);
        }
    }
    
    
    

    useEffect(()=>{
        
      get_carts()
    },[user])
   

    return (
        <UserContext.Provider value={{ user, setUser ,categoria ,setCategoria , search , setSearch ,cart,setCart ,addCart ,saveCart}}>
            {children}
        </UserContext.Provider>
    );
}
