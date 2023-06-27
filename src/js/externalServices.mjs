const baseURL = import.meta.env.VITE_SERVER_URL;
import { getLocalStorage } from './utils.mjs';

async function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    const message = await res.json();
    throw { name: 'servicesError', message };
  }
}

export async function getProductsByCategory(category) {
  const response = await fetch(baseURL + `products/search/${category}`);  const data = await convertToJson(response);
  return data.Result;
}

export async function findProductById(id) {
  const response = await fetch(baseURL + `product/${id}`);
  const data = await convertToJson(response);
  return data.Result;
}


export async function checkout(payload) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };
  return await fetch(baseURL + 'checkout', options).then(convertToJson);
}

export async function loginRequest(creds) {  
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(creds),
  }
  const token = await fetch(baseURL + 'login', options).then(convertToJson)
  return token.accessToken
}

export async function getOrders() {  
  const token = getLocalStorage('so-token')
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  }
  return await fetch(baseURL + 'orders', options).then(convertToJson);
}