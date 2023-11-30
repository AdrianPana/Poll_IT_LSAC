import instance from '../tokenRequestService'

export const getUser = () => {
    return instance.get(`/users`)
}