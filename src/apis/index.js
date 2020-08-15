import { get } from './request'

const baseUrl = 'http://127.0.0.1:5000'

export const fetchTestData = () => get(baseUrl + '/api/test')
