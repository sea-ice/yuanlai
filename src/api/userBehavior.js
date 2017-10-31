import {URL_PREFIX} from '@/api/config'
import axios from 'axios'

export function getEducation () {
  return axios.get(`${URL_PREFIX}/admin/analysis/getEducation`, {})
    .then(response => {
      return Promise.resolve(response.data)
    })
}

export function getGender () {
  return axios.get(`${URL_PREFIX}/admin/analysis/getGender`, {})
    .then(response => {
      return Promise.resolve(response.data)
    })
}
