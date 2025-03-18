export default class CartController {
    constructor({ AppModel }) {
        this.Model = AppModel.CartModel;
    }

    Get_by_user_id = async(req, res)=> {
        try {
            const { id } = req.params;
            const carts = await this.Model.Get_by_id({ user_id: id });

            if (!carts.success) {
                return res.status(404).json({ Error: carts.Error });
            }

            return res.status(200).json(carts.data);
        } catch (error) {
            return res.status(500).json({ Error: "Error interno en el servidor" });
        }
    }

     DeleteCart = async (req, res) => {
        try {
            const { id } = req.params;
            const response = await this.Model.Delete_cart({ cart_id: id });

            if (!response.success) {
                return res.status(404).json({ Error: response.Error });
            }

            return res.status(204).send(); 
        } catch (error) {
            return res.status(500).json({ Error: "Error interno en el servidor" });
        }
    }

     CreateCart = async(req, res) => {
        try {
            const { id } = req.params;
            const products = req.body;

            if (!Array.isArray(products) || products.length === 0) {
                return res.status(400).json({ Error: "Lista de productos inválida" });
            }

            const response = await this.Model.Create_cart({ user_id: id, products });

            if (!response.success) {
                return res.status(400).json({ Error: response.Error });
            }

            return res.status(201).json({ message: "Carrito creado" });
        } catch (error) {
            return res.status(500).json({ Error: "Error interno en el servidor" });
        }
    }

     UpdateCart = async(req, res) => {
        try {
            const { id } = req.params;
            const products = req.body;

            if (!Array.isArray(products) || products.length === 0) {
                return res.status(400).json({ error: "Lista de productos inválida" });
            }

            const response = await this.Model.UpdateCart({ cart_id: id, products });

            if (!response.success) {
                return res.status(404).json({ Error: response.Error });
            }

            return res.status(200).json({ message: "Carrito actualizado" });
        } catch (error) {
            return res.status(500).json({ Error: "Error interno en el servidor" });
        }
    }
}
