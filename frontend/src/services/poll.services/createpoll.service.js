import instance from '../tokenRequestService'

export const createPoll = (title, options) => {

    return instance.post('/polls', {
        title: title,
        options: options
    })
}