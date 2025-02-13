

export function get_prods(cant){
      
    return fetch(`https://fakestoreapi.com/products?limit=${cant}`)
            .then(res=>res.json())
            .then(json=>json)
    
}

export function get_categories(){
    return fetch('https://fakestoreapi.com/products/categories')
    .then(res=>res.json())
    .then(json=>json)
}

export function get_users(){
   return fetch('https://fakestoreapi.com/users')
            .then(res=>res.json())
            .then(json=>json)
}


export function get_cart(id){
    return fetch(`https://fakestoreapi.com/carts/user/${id}`)
    .then(res=>res.json())
    .then(json=>json)
}

export function get_prod(id){
    return fetch(`https://fakestoreapi.com/products/${id}`)
    .then(res=>res.json())
    .then(json=>json)
}