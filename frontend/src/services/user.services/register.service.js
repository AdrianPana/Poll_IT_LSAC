import instance from '../requestService'

export const register = (email, password, confirmPassword) => {
    return instance.post('/users/register', {
        email: email,
        password: password,
        confirmPassword: confirmPassword
    })
}