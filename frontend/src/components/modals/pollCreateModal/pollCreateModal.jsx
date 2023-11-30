import {Modal, Form, Button} from 'react-bootstrap'
import '../modal.css'
import { useState } from 'react';

import { createPoll } from '../../../services/poll.services/createpoll.service';


export default function PollCreateModal(props) {
    
    const [title, setTitle] = useState('')
    const [optionNo, setOptionNo] = useState(3)
    const [options, setOptions] = useState([])

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

    createPoll(title, ops)
    .then(res => {
        props.onHide()
    })
    };
    return (
        <>
            <Modal className='modal'
            {...props}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="modal-title">Create poll</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Label>Title</Form.Label>
                        <input
                            type='text'
                            name="Question"
                            placeholder="Type your question here"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required/>
                        <Form.Label>Answer Options</Form.Label>
                        {
                            [...Array(optionNo)].map((option, index) => (
                                <input key={index}
                                type='text'
                                name={index}
                                placeholder={"Option" + index}
                                value={options[index]}
                                onChange={handleOptionsChange}
                                required/>
                            ))
                        }
                        <div>
                            <Button type='submit'> Create poll </Button>
                        </div>
                    </Form>
                </Modal.Body>

            </Modal>
        </>
    )
}