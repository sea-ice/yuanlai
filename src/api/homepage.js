import {URL_PREFIX} from '@/api/config'
import axios from 'axios'

export function getHotLabels () {
  return axios.get(`${URL_PREFIX}/admin/analysis/getHotLabel`, {})
              .then(response => {
                return Promise.resolve(response.data)
              })
}

export function getHotPosts () {
  return axios.get(`${URL_PREFIX}/admin/analysis/getHotArticle`, {})
    .then(response => {
      return Promise.resolve(response.data)
    })
}
