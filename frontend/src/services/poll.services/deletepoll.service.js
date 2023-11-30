import instance from '../tokenRequestService'

export const erase = (id) => {
    
    return instance.delete(`/polls/${id}`)
}