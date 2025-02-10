

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