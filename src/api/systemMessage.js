import {URL_PREFIX} from '@/api/config'
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
  return axios.post(`${URL_PREFIX}/admin/systemMessage/pushMessage`, {
    data: {
      receiverId: user,
      message: msg
    }
  }).then(response => {
    return Promise.resolve(response.data)
  })
}
