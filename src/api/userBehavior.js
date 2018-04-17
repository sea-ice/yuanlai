import {PROXY_URL, URL_PREFIX} from '@/api/config'
import axios from 'axios'

export function getData (url) {
  return axios.get(`${PROXY_URL}${URL_PREFIX}${url}`, {})
    .then(response => {
      return Promise.resolve(response.data)
    })
}

export function getActiveLabel (id) {
  return axios.get(`${URL_PREFIX}/admin/analysis/getActiveLabel`, {
    params: {
      id
    }
  })
    .then(response => {
      return Promise.resolve(response.data)
    })
}

export function getProvinceData (id) {
  return axios.get(`${URL_PREFIX}/admin/analysis/getProvince`, {
    params: {
      id
    }
  }).then(response => {
    return Promise.resolve(response.data)
  })
}
