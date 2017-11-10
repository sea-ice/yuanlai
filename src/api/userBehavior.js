import {URL_PREFIX} from '@/api/config'
import axios from 'axios'

export function getData (url) {
  return axios.get(`${URL_PREFIX}${url}`, {})
    .then(response => {
      return Promise.resolve(response.data)
    })
}

export function getAllLabels () {
  return axios.get(`${URL_PREFIX}/admin/analysis/getLabelList`, {})
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
