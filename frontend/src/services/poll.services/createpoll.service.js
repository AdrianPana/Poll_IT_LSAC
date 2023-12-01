import instance from '../tokenRequestService'

export const createPoll = (title, singleChoice, options) => {

    return instance.post('/polls', {
        title: title,
        singleChoice: singleChoice,
        options: options
    })
}