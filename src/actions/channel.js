import config from '../config'
import axios from 'axios'
import { updateWelcomeMessage } from 'sso' // i820703

export const getChannelPreferences = (channelId, token) => {
  const client = axios.create({
    baseURL: config.apiUrl,
    headers: {
      Authorization: token,
      Accept: 'application/json',
    },
  })

  return client.get(`/webhook/${channelId}/preferences`).then(res => res.data.results)
                                                        .then(data => updateWelcomeMessage(data)) // i820703
}
