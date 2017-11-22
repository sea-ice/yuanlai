import {URL_PREFIX, PROXY_URL} from '@/api/config'
import axios from 'axios'

export function getData (url) {
  return axios.get(`${URL_PREFIX}${url}`, {})
    .then(response => {
      return Promise.resolve(response.data)
    })
}

export function getUserInfo (id) {
  return axios.get(`${URL_PREFIX}/admin/systemMessage/getUserInfo`, {
    params: {
      id
    }
  }).then(response => {
    return Promise.resolve(response.data)
  })
}

export function pushMessage (user, msg) {
  console.log(user)
  console.log(msg)
  return axios.post(`${PROXY_URL}${URL_PREFIX}/admin/systemMessage/pushMessage`, {
    receiverId: user,
    message: msg
  }).then(response => {
    console.log(response.data)
    return Promise.resolve(response.data)
  })
}
