import http from '../../utils/http'

export const calculate = (traffic, distance, population,userId) => http._get(
  '/api/carbon/traffic?traffic=' + traffic + '&distance=' + distance + '&population=' + population + '&userId=' + userId, 
)