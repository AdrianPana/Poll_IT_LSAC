import instance from '../tokenRequestService'

export const vote = (id, vote) => {
    return instance.patch(`/polls/vote/${id}`, {
        vote: vote
    })
}