import { _processServerResponse } from "./constants";

export const BASE_URL = 'http://localhost:3001';

export const checkToken = (token) => {

  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    },
  })
};

export const updateInfo = (name, avatar, token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      name: name,
      avatar: avatar
    })
  })
};

//item based commands

export const getItems = () => {
  return fetch(`${BASE_URL}/items`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    },
  })
    .then(_processServerResponse)
};

export const uploadItem = (name, imageUrl, weather, token) => {
  return fetch(`${BASE_URL}/items`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ name, imageUrl, weather })
  })
    .then(_processServerResponse)
};

export const deleteItem = (id, token) => {
  return fetch(`${BASE_URL}/items/${id}`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    },
  })
    .then(_processServerResponse)
};

export const likeItem = (id, token) => {
  return fetch(`${BASE_URL}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    },
  })
    .then(_processServerResponse)
};

export const unlikeItem = (id, token) => {
  return fetch(`${BASE_URL}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    },
  })
    .then(_processServerResponse)
};
