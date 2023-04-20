import http from '../../utils/http'

export const getInfo = (userId) => http._get(
  '/api/carbon/record?userId=' + userId
)