import http from '../../utils/http'

export const calculate = (activityLevel, population,userId) => http._get(
  '/api/carbon/activity?activityLevel=' + activityLevel + '&population=' + population + '&userId=' + userId, 
)