import { request } from './api';
import { authHeaders } from './auth';

export function getProducts() {
  return request('/products', {
    headers: authHeaders(),
  });
}

export function getProduct(id) {
  return request(`/products/${id}`, {
    headers: authHeaders(),
  });
}

export function createProduct(product) {
  return request('/products', {
    method: 'POST',
    headers: {
      ...authHeaders(),
    },
    body: JSON.stringify(product),
  });
}

export function updateProduct(id, product) {
  return request(`/products/${id}`, {
    method: 'PUT',
    headers: {
      ...authHeaders(),
    },
    body: JSON.stringify(product),
  });
}

export function deleteProduct(id) {
  return request(`/products/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
}
