
export async function getProductsList(searchTerm) {
    const response = await fetch(`${import.meta.env.VITE_APP_HOST}/444/products?name_like=${searchTerm ? searchTerm : ''}`);
    if(!response.ok){
        throw {
            status : response.status,
            message : response.statusText,
        }
    }
    const data = await response.json();
    return data;
}

export async function getProductDetail(id) {
    const response = await fetch(`${import.meta.env.VITE_APP_HOST}/444/products?id=${id}`)
    if(!response.ok){
        throw {
            status : response.status,
            message : response.statusText,
        }
    }
    const data = await response.json();
    return data;
}

export async function getFeaturedProducts() {
    const response = await fetch(`${import.meta.env.VITE_APP_HOST}/444/featured_products`);
    if(!response.ok){
        throw {
            status : response.status,
            message : response.statusText,
        }
    }
    const data = await response.json();
    return data;
}