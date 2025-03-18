import mysql from "mysql2/promise"

const config = {
    host:"localhost",
    user:"root",
    port:3306,
    password:"",
    database:"ecomerce"
}

const conection = await mysql.createConnection(config)

export default class ProductModel {
     
    static async Get_all(){
    
      try{
        const [res] = await  conection.query(`
        SELECT id,title,price,description,category,image FROM products`)
      
       return {data:[...res] , success:true}

      }
      catch{
        return {Error:"Error en la query a la bd",success:false}
      }
    }
   
    static async Get_by_id({id}){
         
      try{
        const [res] = await conection.query(`
        SELECT id,title,price,description,category,image FROM products WHERE id = ?
        `,[id])
       
        if(res.length<1){
          
          return {Error:"Producto no encontrado",success:false}

        } else{
         
        return {data:[...res] , success:true}

        }
        
      }
      catch{
        
           return {Error:"Error en la query a bd",succes:false}
      }
           
   }
   
   static async Get_by_category ({category}){
      
    try{
      const [res] = await conection.query(`
      SELECT id,title,price,description,category,image FROM products WHERE category = ?
      `,[category])
     
      if(res.length<1){
        
        return {Error:"Esta categoria no existe",success:false}

      } else{
       
      return {data:[...res] , success:true}

      }
      
    }
    catch{
         
         return {Error:"Error en la query a bd",success:false}
    }
         

   }


   static async Get_limit({ limit, page }) {
    try {
        limit = parseInt(limit, 10);
        page = parseInt(page, 10);

        if (isNaN(limit) || isNaN(page) || limit <= 0 || page <= 0) {
            return { Error: "Invalid limit or page", success: false };
        }
  
        // Calcular el offset para paginación
        const offset = (page - 1) * limit;

        
        const [res] = await conection.query(`
            SELECT id, title, price, description, category, image 
            FROM products 
            ORDER BY id ASC 
            LIMIT ? OFFSET ?;`, [limit, offset]);

        
        if (res.length < 1) {
         
            return { Error: "No hay más productos", success: false };
        }
        
        return { data: res, success: true };
    }
    catch (error) {
        
        return { Error: "Error en la query a la bd", success: false };
    }
}

static async SearchProducts({ search }) {
  try {
      const values = [`%${search}%`]; // Agrega % para buscar coincidencias parciales

      const [res] = await conection.query(`SELECT * FROM products WHERE title LIKE ?`, values);

      return { success: true, data: res };
  } catch (error) {
    

      return { success: false, Error: "Error searching products" };
  }
}
}
