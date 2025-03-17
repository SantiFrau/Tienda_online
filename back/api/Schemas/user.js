import { z } from "zod";

const userSchema = z.object({
    email: z.string().email({ message: "El email no es válido" }),
    username: z.string().min(3, { message: "El nombre de usuario debe tener al menos 3 caracteres" }),
    password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
    firstname: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
    lastname: z.string().min(2, { message: "El apellido debe tener al menos 2 caracteres" }),
    phone: z.string().regex(/^\d{10,15}$/, { message: "El teléfono debe tener entre 10 y 15 dígitos numéricos" })
});

export default function validateUserData(userData) {
    const result = userSchema.safeParse(userData);

    if (!result.success) {
        return { success: false, errors: result.error.errors  };
    }

    return { success: true, data: result.data };
}

