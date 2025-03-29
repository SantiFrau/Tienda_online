

export async function get_prods({limit,page}){
    
      
    const prods= await fetch(`http://localhost:1234/products?limit=${limit}&page=${page}`)
            .then(res=>res.json())
            .then(json=>json)
    
    return prods
    
}

export async function get_prods_by_category({category ,page,limit}){
    return fetch(`http://localhost:1234/products?category=${category}&limit=${limit}&page=${page}`)
    .then(res=>res.json())
    .then(json=>json)
}

export async function get_categories(){
    return await fetch('http://localhost:1234/products/categories')
    .then(res=>res.json())
    .then(json=>json)
}

export async function login({email,password}){
   const data={
        email:email,
        password:password
    }

    const token = await fetch("http://localhost:1234/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json" // Especifica que envías JSON
            },
            body: JSON.stringify(data) // Convierte el objeto a JSON
        }).then(res=>res.json())
          .then(json=>json);
    
   
    return token
}

export async function validar_token(token){
    const response = await fetch("http://localhost:1234/users/validate-token", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`, // Enviar el token en el header
            "Content-Type": "application/json"
        }
    }).then(res=>res.json())
    .then(json=>json);;
    
   
    return response
}

export async function Create_user(data){
    const token = await fetch("http://localhost:1234/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json" // Especifica que envías JSON
            },
            body: JSON.stringify(data) // Convierte el objeto a JSON
        }).then(res=>res.json())
          .then(json=>json);

          return token
}

export async function get_cart(id) {
    try {
        const response = await fetch(`http://localhost:1234/carts/${id}`);

        if (response.status === 404) {
           
            return null; 
        }


        const json = await response.json();
        return json;
    } catch (error) {
        console.log("Error en get_cart:", error.message);
        return null; 
    }
}


export async function get_prod(id){
    return await fetch(`http://localhost:1234/products/${id}`)
    .then(res=>res.json())
    .then(json=>json)
}


export async function search(name){
    return await fetch(`http://localhost:1234/products/search/${name}`)
    .then(res=>res.json())
    .then(json=>json)
}

export async function createCart(cart){
    const res = await fetch("http://localhost:1234/carts/Create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json" // Especifica que envías JSON
            },
            body: JSON.stringify(cart) // Convierte el objeto a JSON
        }).then(res=>res.json())
          .then(json=>json);

          return res.success
}

export async function updateCart(cart){
    const res = await fetch("http://localhost:1234/carts/Update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json" // Especifica que envías JSON
            },
            body: JSON.stringify(cart) // Convierte el objeto a JSON
        }).then(res=>res.json())
          .then(json=>json);

          return res.success
}

