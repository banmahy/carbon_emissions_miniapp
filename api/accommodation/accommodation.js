import http from '../../utils/http'

export const calculate = (priceLevel, population, userId) => http._get(
  '/api/carbon/accommodation?priceLevel=' + priceLevel + '&population=' + population + '&userId=' + userId, 
)