

export async function loginUser(authDetails) {
    const response = await fetch(`${import.meta.env.VITE_APP_HOST}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(authDetails)
    })
     
    if(!response.ok){
        throw {
            status : response.status,
            message : response.statusText,
        }
    }

    const data = await response.json();

    if (data.accessToken) {
        sessionStorage.setItem('token', data.accessToken);
        sessionStorage.setItem('id', data.user.id);
        sessionStorage.setItem('name', data.user.name);
    }

    return data;

}

export async function registerUser(authDetails) {

    const response = await fetch(`${import.meta.env.VITE_APP_HOST}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(authDetails)
    })

    if(!response.ok){
        throw {
            status : response.status,
            message : response.statusText,
        }
    }

    const data = await response.json();

    if (data.accessToken) {
        sessionStorage.setItem('token', data.accessToken);
        sessionStorage.setItem('id', data.user.id);
        sessionStorage.setItem('name', data.user.name);
    }

    return data;

}

export function logoutUser(){
         sessionStorage.removeItem('token');
         sessionStorage.removeItem('id');
         sessionStorage.removeItem('name');
}