import instance from '../requestService'

export const login = (email, password) => {
    return instance.post('/users/login', {
        email: email,
        password: password
    })
}