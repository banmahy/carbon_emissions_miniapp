import http from '../../utils/http'

export const login = code =>  http._get('/api/login',{code:code||''})