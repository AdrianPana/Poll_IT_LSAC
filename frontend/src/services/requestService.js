import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:5000/api',
    timeout: 1000,
    headers: {"Content-Type": "application/json"}
})

const token = localStorage.getItem('jwt')
if (token) {
        instance.interceptors.request.use((config) => {
            config.headers['Authorization'] = `Bearer ${token}`
            return config
            }, (e) => {
                return Promise.reject(e)
        })
}

export default instance
