export async function getUser() {

    const token = sessionStorage.getItem("token")
    const id = sessionStorage.getItem("id")

    const response = await fetch(`${import.meta.env.VITE_APP_HOST}/600/users/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    if(!response.ok){
        throw {
            status : response.status,
            message : response.statusText,
        }
    }


    const data = await response.json();
    return data;

}


export async function createOrder(cartList, total, user) {

    const token = sessionStorage.getItem("token")

    const orderDeatils = {
        cartList: cartList,
        total: total,
        quantity: cartList.length,
        user: {
            name: user.name,
            email: user.email,
            id: user.id
        }
    }

    const response = await fetch(`${import.meta.env.VITE_APP_HOST}/660/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(orderDeatils)
    })
    if(!response.ok){
        throw {
            status : response.status,
            message : response.statusText,
        }
    }
    const data = await response.json();
    return data;
}

export async function getUserOrders() {
    const token = sessionStorage.getItem('token');
    const id = sessionStorage.getItem('id');

    const response = await fetch(`${import.meta.env.VITE_APP_HOST}/660/orders?user.id=${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    if(!response.ok){
        throw {
            status : response.status,
            message : response.statusText,
        }
    }

    const data = await response.json();
    return data;
}