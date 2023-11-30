import instance from "./requestService"

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('jwt')
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
}, (e) => {
    return Promise.reject(e)
}
)

export default instance