

export default class ProductController {
    constructor({ AppModel }) {
       
        this.Model = AppModel.ProductModel;
        
    }

     GetAll = async (req, res)  =>  {
    
        try {
            let products;
            const { category, limit, page } = req.query;

            if (category) {
                products = await this.Model.Get_by_category({ category , page , limit });

            } else if (limit && page) {
            
                
                products = await this.Model.Get_limit({ limit:limit,page:page });
            } else {
                products = await this.Model.Get_all();
            }

            if (products.success) {
                return res.status(200).json(products.data);
            } else {
                return res.status(404).json(products);
            }
        } catch (error) {
            

            return res.status(500).json({ Error: "Internal Server Error" });
        }
    }

     Get_by_id = async(req, res) => {
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

   Search = async(req, res) => {
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

    GetCategories = async (req, res) => {
       
        try {
            // Llamar al método GetCategories del modelo
            const categories = await this.Model.get_categories();
            if (categories.success) {
                return res.status(200).json(categories.data);
            } else {
                return res.status(404).json({ Error: "No hay categorías" });
            }
        } catch (error) {
            return res.status(500).json({ Error: "Internal Server Error" });
        }
    }
}
    

