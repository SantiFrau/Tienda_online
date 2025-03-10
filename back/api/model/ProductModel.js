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
      
       return {data:[...res] , succes:true}

      }
      catch{
        return {Error:"Error en la query a la bd",succes:false}
      }
    }
   
    static async Get_by_id({id}){
         
      try{
        const [res] = await conection.query(`
        SELECT id,title,price,description,category,image FROM products WHERE id = ?
        `,[id])
       
        if(res.length<1){
          
          return {Error:"Producto no encontrado",succes:false}

        } else{
         
        return {data:[...res] , succes:true}

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
        
        return {Error:"Esta categoria no existe",succes:false}

      } else{
       
      return {data:[...res] , succes:true}

      }
      
    }
    catch{
         
         return {Error:"Error en la query a bd",succes:false}
    }
         

   }


   static async Get_limit({ limit, page }) {
    try {
  
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
}


ProductModel.Get_limit({limit:10,page:1})