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
        })
      };

    return (
        <>
            <Modal className='modal'
            {...props}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="modal-title">Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <input
                            type='email'
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required/>
                        <input
                            type='password'
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required/>
                        <div>
                            <Button type='submit'> Login </Button>
                        </div>
                    </Form>
                </Modal.Body>

            </Modal>
        </>
    )
}