import http from '../../utils/http'

export const login = (code,userInfo) =>  http._get('/login',{code:code||'', userInfo: userInfo})