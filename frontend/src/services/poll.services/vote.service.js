import instance from '../tokenRequestService'

export const vote = (id, vote) => {
    console.log(instance.defaults.headers.common['Authorization'])
    return instance.patch(`/polls/vote/${id}`, {
        vote: vote
    })
}