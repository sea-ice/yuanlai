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

export function getHobbies () {
  return axios.get(`${URL_PREFIX}/admin/analysis/getHobby`, {})
    .then(response => {
      return Promise.resolve(response.data)
    })
}

export function getAMonthNewUserNum () {
  return axios.get(`${URL_PREFIX}/admin/main/getNewUserNum`, {})
    .then(response => {
      return Promise.resolve(response.data)
    })
}

export function getActiveUserNum () {
  return axios.get(`${URL_PREFIX}/admin/main/getActiveUserNum`, {})
    .then(response => {
      return Promise.resolve(response.data)
    })
}

export function getRemainUserNum () {
  return axios.get(`${URL_PREFIX}/admin/main/getRemainUserNum`, {})
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

export function getHelpArticle () {
  return axios.get(`${URL_PREFIX}/admin/analysis/getHelpArticle`, {})
    .then(response => {
      return Promise.resolve(response.data)
    })
}

export function getShareArticle () {
  return axios.get(`${URL_PREFIX}/admin/analysis/getShareArticle`, {})
    .then(response => {
      return Promise.resolve(response.data)
    })
}

export function getInteractive () {
  return axios.get(`${URL_PREFIX}/admin/analysis/getInteractive`, {})
    .then(response => {
      return Promise.resolve(response.data)
    })
}

export function getClick () {
  return axios.get(`${URL_PREFIX}/admin/analysis/getClick`, {})
    .then(response => {
      return Promise.resolve(response.data)
    })
}
