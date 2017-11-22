import {URL_PREFIX, PROXY_URL} from '@/api/config'
import axios from 'axios'
// import $ from 'jquery'

export function getData (url) {
  return axios.get(`${URL_PREFIX}${url}`, {})
    .then(response => {
      return Promise.resolve(response.data)
    })
}

export function handleFeedback (id) {
  return axios.post(`${PROXY_URL}${URL_PREFIX}/admin/feedback/handleFeedback`, {
    id: id
  })
    .then(response => {
      return Promise.resolve(response.data)
    })
}

export function delFeedback (id) {
  return axios.post(`${PROXY_URL}${URL_PREFIX}/admin/feedback/deleteFeedback`, {
    id: id
  })
    .then(response => {
      return Promise.resolve(response.data)
    })
}
