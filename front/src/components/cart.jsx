import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./context";
import { get_cart, get_prod } from "../get_prod"; // <-- Importa correctamente

export default function Cart() {
    let navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState({}); // Almacena productos cargados

    useEffect(() => {
        if (!user) {
            navigate("/");
            return;
        }
        get();
    }, [user]);

    async function get() {
        if (!user || !user.id) return;
        const c = await get_cart(user.id);
        setCart(c);

        // Cargar productos en paralelo
        const productData = {};
        for (const cItem of c) {
            for (const prod of cItem.products) {
                if (!productData[prod.productId]) {
                    productData[prod.productId] = await get_prod(prod.productId);
                }
            }
        }
        setProducts(productData);
    }

    return (
        <div className="mt-15">
            {cart.length > 0 ? (
                <div>
                    {cart.map((cItem, index) => {
                        let totalPedido = 0; // <-- Total por cada pedido
                        return (
                            <div className="w-full flex flex-col gap-5 md:p-10" key={index}>
                                <h5 className="w-full text-center font-bold text-xl">
                                    Pedido: {cItem.id}
                                </h5>
                                {cItem.products.map((prod, i) => {
                                    const product = products[prod.productId]; // Accede al producto cargado
                                    const totalProducto = (product?.price || 0) * prod.quantity;
                                    totalPedido += totalProducto; // <-- Acumula el total del pedido
                                    
                                    return product ? (
                                        <div
                                            key={i}
                                            className="w-full font-bold h-30 gap-2 bg-white flex flex-row rounded-r-2xl justify-between p-5 items-center"
                                        >
                                            <img className="h-full w-max" src={product.image} alt={product.title} />
                                            <p className="max-w-1/2 h-full overflow-hidden whitespace-nowrap ">{product.title}</p>
                                            <div className="flex flex-col items-center">
                                                <p>Quantity</p>
                                                <p>{prod.quantity}</p>
                                            </div>
                                            <p className="text-green-600 md:block hidden">${product.price}</p>
                                            <div className="flex flex-col items-center">
                                                <p>Total</p>
                                                <p className="text-green-600">${totalProducto}</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="w-full text-center" key={i}>
                                            Cargando...
                                        </div>
                                    );
                                })}
                                <h5 className="w-full text-center font-bold text-xl">
                                    Precio Total del Pedido: <span className="text-green-600">${totalPedido}</span>
                                </h5>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p>El carrito está vacío</p>
            )}
        </div>
    );
}
