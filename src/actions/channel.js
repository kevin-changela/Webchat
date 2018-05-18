import config from '../config'

/*** i820703 ***/
import { updateWelcomeMessage } from 'sso'
/*** i820703 ***/

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
/*** i820703 ***/    
    .then(data => updateWelcomeMessage(data))
/*** i820703 ***/    
