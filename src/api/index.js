import ajax from './ajax'
const BASE_URL = '/api'
export const reqBanner = (num) => ajax(`${BASE_URL}/banner?type=${num}`)
