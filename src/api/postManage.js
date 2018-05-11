import {URL_PREFIX} from '@/api/config'
import axios from 'axios'

export function movePlainPost (postId) {
  return axios.post(`${URL_PREFIX}/admin/manager/translateIntoRecommendArticle`, {
    id: postId
  })
    .then(response => {
      return Promise.resolve(response.data)
    })
}
