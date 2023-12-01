import instance from '../tokenRequestService'

export default function Vote(id, votes) {
    return instance.patch(`/polls/vote/${id}`, {
        votes: votes
    })
}