import axios from 'axios'

const instance = axios.create()

// 请求映射
const tokenMap = new Map()
// 拼接请求的url和方法，同样的url+方法可以视为相同的请求
const generateToken = (config) => (`${config.url}_${config.method}`)
// 中断重复的请求，并从映射中移除
const removeCancelToken = (config) => {
  const token = generateToken(config)
  const canceler = tokenMap.get(token)
  if (canceler) {
    canceler(`取消请求：${token}`)
    tokenMap.delete(token)
  }
}

instance.interceptors.request.use(config => {
  if (config.nonConcurrent) {
    // 中断之前的同名请求
    removeCancelToken(config)
    // 添加 axios 内置的中断 ajax 的方法 CancelToken
    config.cancelToken = new axios.CancelToken((canceler) => {
      const token = generateToken(config)
      tokenMap.set(token, canceler)
    })
  }

  return config
}, error => {
  return Promise.reject(error)
})

instance.interceptors.response.use(response => {
    if (response.config.nonConcurrent)
      // 在请求完成后，自动移出映射
      removeCancelToken(response.config)

    return response.data
  },
  error => {
    // 如果请求中断，打印取消请求信息
    if (error instanceof axios.Cancel)
      return Promise.reject(error.message)

    switch (error.response.status) {
      case 401:
        break
      case 403:
        break
      case 500:
        break
    }
    return Promise.reject(error.response.data)
  })

export const post = (url, data, config = {}) => {
  const defaultConfig = {
    nonConcurrent: true // true 非并发的, false 允许并发
  }
  config = { ...Object.assign({}, defaultConfig, config) }
  return instance.post(url, data, config)
}

export const get = (url, params, config = {}) => {
  const defaultConfig = {
    nonConcurrent: true
  }
  config = { ...Object.assign({}, defaultConfig, config) }
  return instance.get(url, { params, ...config })
}
