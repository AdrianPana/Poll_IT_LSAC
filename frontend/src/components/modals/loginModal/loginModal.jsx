import {Modal, Form, Button} from 'react-bootstrap'
import '../modal.css'
import { useState } from 'react';

import { login } from '../../../services/user.services/login.service'

export default function LoginModal(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const handleSubmit = (e) => {
        e.preventDefault()
        
        login(email, password)
        .then(res => {
            localStorage.setItem("jwt", res.data.message)
            props.onHide()
            window.location.reload(false);
        })
    };

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
                    <Modal.Title className='modal-title'> Login </Modal.Title>
                    <Form onSubmit={handleSubmit} className='form-content'>
                        <div>
                        <input
                            type='email'
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required/>
                        </div>
                        <div>
                        <input
                            type='password'
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required/>
                        </div>
                        <div>
                            <Button className='btn-submit' type='submit' variant='light'> Login </Button>
                        </div>
                    </Form>
                </Modal.Body>

            </Modal>
        </>
    )
}