import {URL_PREFIX} from '@/api/config'
import axios from 'axios'

export function getData (url) {
  return axios.get(`${URL_PREFIX}${url}`, {})
    .then(response => {
      return Promise.resolve(response.data)
    })
}
