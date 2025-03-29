import mysql from "mysql2/promise";

const config = {
    host: "localhost",
    user: "root",
    port: 3306,
    password: "",
    database: "ecomerce"
};

const connection = await mysql.createConnection(config);

export default class ProductModel {

    static async Get_all() {
        try {
            const [res] = await connection.query(`
                SELECT p.id, p.title, p.price, p.description, c.name AS category, p.image 
                FROM products p 
                LEFT JOIN categories c ON p.category_id = c.id
            `);

            return { data: [...res], success: true };
        } catch (error) {
            return { Error: "Error en la query a la bd", success: false };
        }
    }

    static async Get_by_id({ id }) {
        try {
            const [res] = await connection.query(`
                SELECT p.id, p.title, p.price, p.description, c.name AS category, p.image
                FROM products p
                LEFT JOIN categories c ON p.category_id = c.id
                WHERE p.id = ?
            `, [id]);

            if (res.length < 1) {
                return { Error: "Producto no encontrado", success: false };
            } else {
                return { data: [...res], success: true };
            }
        } catch (error) {
            return { Error: "Error en la query a la bd", success: false };
        }
    }

    static async Get_by_category({ category, limit, page }) {
        try {
            limit = parseInt(limit, 10);
            page = parseInt(page, 10);

            if (!category || isNaN(limit) || isNaN(page) || limit <= 0 || page <= 0) {
                return { Error: "Invalid category, limit or page", success: false };
            }

            const offset = (page - 1) * limit;

            const [res] = await connection.query(`
                SELECT p.id, p.title, p.price, p.description, c.name AS category, p.image
                FROM products p
                LEFT JOIN categories c ON p.category_id = c.id
                WHERE c.name = ?
                ORDER BY p.id ASC
                LIMIT ? OFFSET ?
            `, [category, limit, offset]);

            if (res.length < 1) {
                return { Error: "No hay más productos en esta categoría", success: false };
            }

            return { data: res, success: true };
        } catch (error) {
            return { Error: "Error en la query a la bd", success: false };
        }
    }

    static async Get_limit({ limit, page }) {
        try {
            limit = parseInt(limit, 10);
            page = parseInt(page, 10);

            if (isNaN(limit) || isNaN(page) || limit <= 0 || page <= 0) {
                return { Error: "Invalid limit or page", success: false };
            }

            const offset = (page - 1) * limit;

            const [res] = await connection.query(`
                SELECT p.id, p.title, p.price, p.description, c.name AS category, p.image
                FROM products p
                LEFT JOIN categories c ON p.category_id = c.id
                ORDER BY p.id ASC
                LIMIT ? OFFSET ?
            `, [limit, offset]);

            if (res.length < 1) {
                return { Error: "No hay más productos", success: false };
            }

            return { data: res, success: true };
        } catch (error) {
            return { Error: "Error en la query a la bd", success: false };
        }
    }

    static async SearchProducts({ search }) {
        try {
            const values = [`%${search}%`];

            const [res] = await connection.query(`
                SELECT p.id, p.title, p.price, p.description, c.name AS category, p.image 
                FROM products p 
                LEFT JOIN categories c ON p.category_id = c.id
                WHERE p.title LIKE ?
            `, values);

            return { success: true, data: res };
        } catch (error) {
            return { success: false, Error: "Error searching products" };
        }
    }

    static async get_categories() {
        try {
            const [res] = await connection.query(`SELECT * FROM categories`);

            return { success: true, data: res };
        } catch (error) {
            return { success: false, Error: "Error fetching categories" };
        }
    }
}

