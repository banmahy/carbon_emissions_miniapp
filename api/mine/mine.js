import http from '../../utils/http'

export const login = (code,userInfo) =>  http._get('/api/login',{code:code||'', userInfo: userInfo})