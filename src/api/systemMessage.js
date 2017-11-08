import {URL_PREFIX} from '@/api/config'
import axios from 'axios'

export function getMessageList () {
  return axios.get(`${URL_PREFIX}/admin/systemMessage/getPushedMessageList`, {})
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
