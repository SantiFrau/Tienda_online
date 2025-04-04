import mysql from "mysql2/promise"
import  argon2  from "argon2"
import jwt from "jsonwebtoken"
const secret_var="A2Tg7d9#Qw4DpKmz2+S3sE!a9pH2xJ6bV!6Yd4t9#"
const config = {
    host:"localhost",
    user:"root",
    port:3306,
    password:"",
    database:"ecomerce"
}

const conection = await mysql.createConnection(config)

export default class UsersModel{

    static async Get_user_by_email({email}){
     
     try{
        const [res] = await conection.query(`SELECT id,email,username,password,firstname,lastname,phone FROM users WHERE email= ?`,[email])
        
        if(res.length<1){
           
           return {Error:"Usuario no encontrado",success:false}
        } else{
            return {data:"Usuario existente",success:true}
        }
     
      //funcion modifcada pra que solo devuelva si existe el ususario

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
             
            return {Error:"Error en la query a la bd",success:false}

        }
        
    }

    static async Create_user({ data }) {
        try {
            const user = { ...data, password: await argon2.hash(data.password) };
    
            const [uuid_result] = await conection.query("SELECT UUID() uuid;");
            const [{ uuid }] = uuid_result;
    
            // Insertar usuario en la base de datos
            const res = await conection.query(`
                INSERT INTO users (id, email, username, password, firstname, lastname, phone) 
                VALUES (?, ?, ?, ?, ?, ?, ?);
            `, [uuid, user.email, user.username, user.password, user.firstname, user.lastname, user.phone]);
    
            // Obtener la dirección del usuario
            const [addressResult] = await conection.query(`
                SELECT 
                    c.name AS city,
                    a.number,
                    s.name AS street,
                    a.zipcode
                FROM addresses a
                JOIN cities c ON a.city_id = c.id
                JOIN streets s ON a.street_id = s.id
                WHERE a.user_id = ?;
            `, [uuid]);
    
            // Estructurar la dirección y reemplazar campos vacíos por "No definido"
            const address = addressResult.length > 0 ? {
                city: addressResult[0].city || "No definido",
                number: addressResult[0].number || "No definido",
                street: addressResult[0].street || "No definido",
                zipcode: addressResult[0].zipcode || "No definido"
            } : {
                city: "No definido",
                number: "No definido",
                street: "No definido",
                zipcode: "No definido"
            };
    
            // Generar un token JWT
            const token = jwt.sign(
                {
                    id: uuid,
                    email: user.email,
                    username: user.username,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    phone: user.phone,
                    address: address
                },
                secret_var,
                { expiresIn: "2h" }
            );
    
            return { token, success: true };
        } catch (error) {
            console.error(error);
            return { Error: error.code, success: false };
        }
    }
    

    static async Login_user({ email, password }) {
        try {
            const [result] = await conection.query(
                `SELECT id, email, username, password, firstname, lastname, phone FROM users WHERE email = ?`,
                [email]
            );
    
            if (result.length < 1) {
                return { Error: "Usuario no encontrado", success: false };
            }
    
            const user = result[0];
    
            // Comparar la contraseña con la almacenada en la DB
            const passwordMatch = await argon2.verify(user.password, password);
            if (!passwordMatch) {
                return { Error: "Contraseña incorrecta", success: false };
            }
    
            // Obtener la dirección del usuario
            const [addressResult] = await conection.query(`
                SELECT 
                    c.name AS city,
                    a.number,
                    s.name AS street,
                    a.zipcode
                FROM addresses a
                JOIN cities c ON a.city_id = c.id
                JOIN streets s ON a.street_id = s.id
                WHERE a.user_id = ?;
            `, [user.id]);
    
            // Estructurar la dirección y reemplazar campos vacíos por "No definido"
            const address = addressResult.length > 0 ? {
                city: addressResult[0].city || "No definido",
                number: addressResult[0].number || "No definido",
                street: addressResult[0].street || "No definido",
                zipcode: addressResult[0].zipcode || "No definido"
            } : {
                city: "No definido",
                number: "No definido",
                street: "No definido",
                zipcode: "No definido"
            };
    
            // Generar un token JWT
            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    phone: user.phone,
                    address: address
                },
                secret_var,
                { expiresIn: "2h" }
            );
    
            return { token, success: true };
    
        } catch (error) {
            console.error(error);
            return { Error: "Error en la consulta a la bd", success: false };
        }
    }
    
    
}

/*
UsersModel.Create_user({ data:{
    username:"hola",
    password:"1234",
    email:"hola@gmail.com",
    firstname:"a",
    lastname:"b",
    phone:"14513"}
})*/

//console.log(await UsersModel.Login_user({email:"santiago@gmail.com",password:"123456"}))
