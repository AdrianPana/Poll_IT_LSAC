import instance from '../requestService'

export const getPolls = () => {
    return instance.get('/polls')
}