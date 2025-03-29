import mysql from "mysql2/promise"
const config = {
    host:"localhost",
    user:"root",
    port:3306,
    password:"",
    database:"ecomerce"
}
const conection = await mysql.createConnection(config)

export default class CartModel {
   
   
    static async Get_by_id({ user_id }) {
        try {
            // Obtener el carrito del usuario
            const [cartResult] = await conection.query(
                `SELECT id FROM carts WHERE user_id = ?`,
                [user_id]
            );
    
            if (!cartResult || cartResult.length === 0) {
                return { success: false, Error: "No se encontró un carrito para este usuario." };
            }
    
            const cart_id = cartResult[0].id;
    
            // Obtener los productos del carrito
            const [cartItems] = await conection.query(
                `SELECT product_id, quantity FROM cart_items WHERE cart_id = ?`,
                [cart_id]
            );
    
            return { success: true, data: { cart_id, products: cartItems } };
        } catch (error) {
            return { success: false, Error: "Error en la consulta a la BD" };
        }
    }
    

    static async Delete_cart({ cart_id }) {
        try {
            const [res] = await conection.query(`DELETE FROM carts WHERE id = ?;`, [cart_id]);
    
            if (res.affectedRows === 0) {
                return { success: false, error: "No se encontró un carrito con ese ID." };
            }
    
            return { success: true, data: "Cart DELETED" };
        } catch (error) {
            console.error("Error al eliminar el carrito:", error);
            return { success: false, error: "Error en la consulta en la bd" };
        }
    }

    static async Create_cart({ products, user_id }) {
        try {
            const [userExists] = await conection.query(
                `SELECT id FROM users WHERE id = ?`,
                [user_id]
              );
              
              if (userExists.length === 0) {
                return { success: false, Error: "El usuario no existe" };
              }

            // Crear el carrito y obtener su ID
            const [insertRes] = await conection.query(`INSERT INTO CARTS (user_id) VALUES (?)`, [user_id]);
            const cart_id = insertRes.insertId; // Obtiene el ID del carrito recién creado
    
            if (!cart_id) {
                return { success: false, Error: "No se pudo crear el carrito" };
            }
    
            // Insertar los productos en el carrito
            await Promise.all(products.map(async (prod) => {
                await conection.query(
                    `INSERT INTO CART_ITEMS (cart_id, product_id, quantity) VALUES (?, ?, ?)`,
                    [cart_id, prod.product_id, prod.quantity]
                );
            }));
    
            return { success: true, data: "Cart created" };

        } catch (error) {
            console.error("Error en la consulta a la BD:", error);
            return { success: false, Error: "Error en la consulta a la BD" };
        }
    }
    

    static async UpdateCart({ cart_id, products }) {
        try {
            // Verificar si el carrito existe
            const [cartExists] = await conection.query(
                `SELECT id FROM carts WHERE id = ?`, 
                [cart_id]
            );
    
            if (cartExists.length === 0) {
                return { success: false, Error: "Carrito no encontrado" };
            }
    
            // Iniciar una transacción para asegurar consistencia
            await conection.beginTransaction();
    
            for (const prod of products) {
                const [existing] = await conection.query(
                    `SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ?`,
                    [cart_id, prod.product_id]
                );
    
                if (existing.length > 0) {
                    // Si el producto ya está en el carrito actualiza la cantidad
                    await conection.query(
                        `UPDATE cart_items SET quantity = ? WHERE cart_id = ? AND product_id = ?`,
                        [prod.quantity, cart_id, prod.product_id]
                    );
                } else {
                    // Si el producto no está en el carrito insertarlo
                    await conection.query(
                        `INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)`,
                        [cart_id, prod.product_id, prod.quantity]
                    );
                }
            }
    
            // Confirmar la transacción
            await conection.commit();
            return { success: true, message: "Carrito actualizado" };
    
        } catch (error) {
            // Revertir cambios en caso de error
            await conection.rollback();
            return { success: false, Error: "Error actualizando el carrito" };
        }
    }
}    


//CartModel.Create_cart({products:[{product_id:1,quantity:10},{product_id:2,quantity:10}],user_id:"d2d06441-fdf5-11ef-a6e5-b42e99e9b2d5"})
//CartModel.UpdateCart({cart_id:1,products:[{product_id:1,quantity:2},{product_id:4,quantity:30}]})
//CartModel.Get_by_id({user_id:"0b3d7070-01d5-11f0-a75f-b42e99e9b2d5"})