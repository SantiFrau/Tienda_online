

export default class ProductController {
    constructor({ AppModel }) {
        this.Model = AppModel.ProductModel;
    }

    async GetAll(req, res) {

        try {
            let products;
            const { category, limit, page } = req.query;

            if (category) {
                products = await this.Model.Get_by_category({ category });

            } else if (limit && page) {
            

                products = await this.Model.Get_limit({ limit,page });
            } else {
                products = await this.Model.GetAll();
            }

            if (products.success) {
                return res.status(200).json(products.data);
            } else {
                return res.status(404).json({ Error: "Not found" });
            }
        } catch (error) {
            

            return res.status(500).json({ Error: "Internal Server Error" });
        }
    }

    async Get_by_id(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ Error: "Product ID is required" });
            }

            const product = await this.Model.Get_by_id({ id });

            if (product.success) {
                return res.status(200).json(product.data);
            } else {
                return res.status(404).json({ Error: "Not found" });
            }
        } catch (error) {
           
            return res.status(500).json({ Error: "Internal Server Error" });
        }
    }

    async Search(req, res) {
        try {
            const { search } = req.params; 
    
            if (!search || search.trim() === "") {
                return res.status(400).json({ Error: "Search query is required" });
            }
    
            const products = await this.Model.SearchProducts({ search });
    
            if (products.success) {
                return res.status(200).json(products.data);
            } else {
                return res.status(404).json({ Error: "No products found" });
            }
        } catch (error) {
            
            return res.status(500).json({ Error: "Internal Server Error" });
        }
    }
    
}
