import {Modal, Form, Button} from 'react-bootstrap'
import '../modal.css'
import { useState } from 'react';

import { createPoll } from '../../../services/poll.services/createpoll.service';


export default function PollCreateModal(props) {
    
    const [title, setTitle] = useState('')
    const [optionNo, setOptionNo] = useState(3)
    const [options, setOptions] = useState([])
    const [singleChoice, setChoiceType] = useState(true)

    const handleOptionsChange = (e) => {
        const {name, value} = e.target
        setOptions((arr) => ({
            ...arr,
            [name]: value
        }))
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        
        const ops = []
        for (let i = 0 ; i < optionNo; i++) {
            ops.push(options[i])
        }

        createPoll(title, singleChoice, ops)
        .then(res => {
            props.onHide()
            window.location.reload(false);
        }).catch((e) => {
            console.log(e)
        })
    };

    const moreOptions = () => {
        setOptionNo(optionNo + 1)
    }

    const removeOption = () => {
        setOptionNo(optionNo - 1)
    }

    const closeModal = () => {
        props.onHide();
    }

    return (
        <>
            <Modal className='modal'
            {...props}
            >   
                <Modal.Body className='modal-body'>
                <button onClick={closeModal} type="button" className="btn-close" aria-label="Close"></button>
                <Modal.Title className='modal-title'> Create a Poll </Modal.Title>
                    <Form onSubmit={handleSubmit} className='form-content'>
                        <div>
                            <Form.Label>Title</Form.Label>
                        </div>
                        <div>
                        <input
                            type='text'
                            name="Question"
                            placeholder="Type your question here"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required/>
                        </div>

                            <div>
                            <Form.Label className='vote-title'>Voting type</Form.Label>
                            </div>
                            <div>
                                <Form.Label>
                                <input name='single' type='radio' className='btn-radio'
                                    value={0} checked={singleChoice == true} onChange={() => setChoiceType(true)}/>
                                Single choice
                                </Form.Label>
                            </div>
                            <div>
                                <Form.Label>
                                <input name='multiple' type='radio' className='btn-radio'
                                value={1} checked={singleChoice == false} onChange={() => setChoiceType(false)}/>
                                Multiple choice
                                </Form.Label>
                            </div>

                        <div>
                            <Form.Label>Answer Options</Form.Label>
                        </div>
                        {
                            [...Array(optionNo)].map((option, index) => (
                                <>
                                <div key={index}>
                                <input key={index}
                                type='text'
                                name={index}
                                placeholder={"Option " + (index + 1)}
                                value={options[index]}
                                onChange={handleOptionsChange}
                                required/>
                                </div>
                                </>
                                ))
                        }
                        { optionNo > 3 ? (
                            <div>
                            <Button variant='danger' onClick={removeOption}>-Remove option</Button>
                            </div>
                        ) : (
                            <>
                            </>
                        )}
                        <div>
                            <Button onClick={moreOptions}> +Add option </Button>
                        </div>
                        <div>
                            <Button type='submit'> Create poll </Button>
                        </div>
                    </Form>
                </Modal.Body>

            </Modal>
        </>
    )
}