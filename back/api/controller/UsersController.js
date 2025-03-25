import validateUserData from "../Schemas/user.js";
import jwt from "jsonwebtoken"
const secret_var="A2Tg7d9#Qw4DpKmz2+S3sE!a9pH2xJ6bV!6Yd4t9#"

export default class UsersController {
    constructor({ AppModel }) {
        this.Model = AppModel.UsersModel;
    }

    Register = async(req, res)=> {
        try {
            const user = req.body;

            // Validar datos antes de consultar la base de datos
            const userValidation = validateUserData(user);
            if (!userValidation.success) {                           
                return res.status(400).json({ 
                    Error: "Datos del usuario inválidos", 
                    details: userValidation.errors 
                });
            }

            // Verificar si el usuario ya existe
            const exist = await this.Model.Get_user_by_email({ email: user.email });
            if (exist.success) {  
                return res.status(409).json({ Error: "El usuario ya está registrado" , success:false });
            }

            // Crear usuario
            const newUser = await this.Model.Create_user({ data: userValidation.data });

            if (newUser.success) {
                return res.status(201).json({ 
                    token: newUser.token,
                    success:true
                });

            } else {
                return res.status(500).json({ message: "No se pudo crear el usuario" , Error:newUser.Error , success:false });
            }
        } catch (error) {
            
            return res.status(500).json({ Error: "Error interno del servidor" ,success:false});
        }
    }

     Login = async(req, res)=> {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ Error: "Email y contraseña son obligatorios" ,success:false });
            }

            const userResponse = await this.Model.Login_user({ email, password });

            if (!userResponse.success) {
                return res.status(401).json({ Error: userResponse.Error ,success:false });
            }

            return res.status(200).json({token:userResponse.token , success:true});
        } catch (error) {
            
            return res.status(500).json({ Error: "Error interno del servidor" , success:false });
        }
    }

   ValidateToken = async(req, res)=> {
        try {
            const token = req.headers.authorization?.split(" ")[1]; // Extraer token del header

            if (!token) {
                return res.status(401).json({ Error: "Token no proporcionado" ,success:false });
            }

            jwt.verify(token, secret_var, (err, decoded) => {
                if (err) {
                    return res.status(401).json({ error: "Token inválido o expirado" ,success:false });
                }

                return res.status(200).json({ success: true, data: decoded });
            });

        } catch (error) {
             
            console.log(error)
            return res.status(500).json({ error: "Error interno del servidor" ,success:false});
        }
    }
}
