import mysql from "mysql2/promise"

const config = {
    host:"localhost",
    user:"root",
    port:3306,
    password:"",
    database:"ecomerce"
}

const conection = await mysql.createConnection(config)

export default class UsersModel{

    static async Get_user_by_name({username}){
     
     try{
        const [res] = await conection.query(`SELECT id,email,username,password,firstname,lastname,phone FROM users WHERE username= ?`,[username])
        
        if(res.length<1){
           
           return {Error:"Usuario no encontrado",succes:false}
        }

        const [addres] = await conection.query(`
        SELECT 
        c.name AS city,
        s.name AS street,
        a.number,
        a.zipcode
        FROM addresses a
        JOIN cities c ON a.city_id = c.id
        JOIN streets s ON a.street_id = s.id
        WHERE a.user_id = ?;
        `,[res[0].id])
     
    
     const user = {...res[0], addres:{...addres[0]}}
     
     
      return {data:user,succes:true}

        }
        catch{
             
            return {Error:"Error en la query a la bd",succes:false}

        }
        
    }
    
}

UsersModel.Get_user_by_name({username:"johnd"})