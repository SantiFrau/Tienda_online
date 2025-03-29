import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./context";
import { get_prod } from "../get_prod";



export default function Cart() {
    let navigate = useNavigate();
    const { user, cart , addCart ,saveCart } = useContext(UserContext);
    
    const [products, setProducts] = useState({}); // Almacena productos cargados

    useEffect(() => {
        if (!user) {
            navigate("/");
            return;
        }
        if (cart) {
            get_prods();
        }
    }, [user, cart]);

    const get_prods = async () => {
        if (!cart || !cart.products) return;

        const productData = { ...products }; // Mantener productos previos

        for (const prod of cart.products) {
            if (!productData[prod.product_id]) {
                const [p] = await get_prod(prod.product_id);
                productData[prod.product_id] = p;
            }
        }

        setProducts(productData);
    };

    if (!cart || !cart.products) {
        return <p className="text-center">El carrito está vacío</p>;
    }

    let totalPedido = 0;

    return (
        <div className="mt-15">
            <div className="w-full flex flex-col gap-5 md:p-10">
                
                {cart.products.map((prod, i) => {
                    const product = products[prod.product_id]; // Accede al producto cargado
                    const totalProducto = (product?.price || 0) * prod.quantity;
                    totalPedido += totalProducto; // Acumula el total del pedido

                    return product ? (
                        <div
                            key={i}
                            className="border-2 shadow-gray-800 shadow-xl border-gray-800 w-full font-bold h-30 gap-2 bg-white flex flex-row rounded-r-2xl justify-between p-5 items-center"
                        >
                            <img className="h-full w-max" src={product.image} alt={product.title} />
                            <p className="max-w-1/2 h-full overflow-hidden whitespace-nowrap ">
                                {product.title}
                            </p>
                            <div className="flex flex-col items-center">
                                <p>Quantity</p>
                                <div className="flex flex-row gap-2">
                                    <button className="w-6 text-white border border-gray-300 bg-gray-800 rounded-full hover:bg-gray-700 hover:scale-110 transition-all" onClick={
                                        ()=>{ addCart(prod.product_id,true)}
                                    }>-</button>
                                    <p>{prod.quantity}</p>
                                    <button className="w-6 text-white border border-gray-300 bg-gray-800 rounded-full hover:bg-gray-700 hover:scale-110 transition-all" onClick={
                                        ()=>{ addCart(prod.product_id)}
                                    }>+</button>
                                </div>
                               
                            </div>
                            <p className="text-green-600 md:block hidden">${product.price}</p>
                            <div className="flex flex-col items-center">
                                <p>Total</p>
                                <p className="text-green-600">${Math.round(totalProducto * 100) / 100}</p>
                            </div>
                            
                        </div>
                    ) : (
                        <div className="w-full text-center" key={i}>
                            Cargando...
                        </div>
                    );
                })}

                <h5 className="w-full text-center font-bold text-xl">
                    Precio Total del Pedido: <span className="text-green-600">${Math.round(totalPedido * 100) / 100}</span>
                </h5>
                <div className="w-full flex flex-row justify-center gap-5 items-center">
                                <button className="bg-gray-800 px-5 py-2 border-2 border-gray-300 rounded-lg text-white hover:bg-gray-700 hover:scale-110 cursor-pointer transition-all" onClick={()=>{saveCart()}}>Guardar Compra</button>
                                <button className="bg-gray-800 px-5 py-2 border-2 border-gray-300 rounded-lg text-white hover:bg-gray-700 hover:scale-110 cursor-pointer transition-all">Eliminar</button>
                                <button className="bg-gray-800 px-5 py-2 border-2 border-gray-300 rounded-lg text-white hover:bg-gray-700 hover:scale-110 cursor-pointer transition-all">Realizar Compra</button>
                            </div>
            </div>
        </div>
    );
}
