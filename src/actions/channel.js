import config from '../config'
import { updateWelcomeMessage } from 'sso'

export const getChannelPreferences = (channelId, token) =>
  fetch(`${config.apiUrl}/webhook/${channelId}/preferences`, {
    method: 'get',
    headers: {
      Authorization: token,
      Accept: 'application/json',
    },
  })
    .then(res => res.json())
    .then(data => data.results)
    .then(data => updateWelcomeMessage(data))
