import {URL_PREFIX, PROXY_URL} from '@/api/config'
import axios from 'axios'
// import $ from 'jquery'

export function login (username, password) {
  return axios.post(`${PROXY_URL}${URL_PREFIX}/tokens/login`, {
    username,
    password
  })
    .then(response => {
      return Promise.resolve(response.data)
    })
}

export function loginOut () {
  return axios.get(`${URL_PREFIX}/tokens/loginout`)
    .then(response => {
      return Promise.resolve(response.data)
    })
}

export function checkToken (userId, token) {
  return axios.post(`${PROXY_URL}${URL_PREFIX}/tokens/login`, {
    userId,
    token
  })
    .then(response => {
      return Promise.resolve(response.data)
    })
}
