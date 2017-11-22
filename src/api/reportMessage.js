import {URL_PREFIX, PROXY_URL} from '@/api/config'
import axios from 'axios'

export function getData (url) {
  return axios.get(`${URL_PREFIX}${url}`, {})
    .then(response => {
      return Promise.resolve(response.data)
    })
}

export function handleReport (id, type) {
  return axios.post(`${PROXY_URL}${URL_PREFIX}/admin/accusation/submitResult`, {
    id: id,
    result: type
  })
    .then(response => {
      return Promise.resolve(response.data)
    })
}
