import {Modal, Form, Button} from 'react-bootstrap'
import '../modal.css'
import { useState } from 'react';

import { register } from '../../../services/user.services/register.service'
import { login } from '../../../services/user.services/login.service';

export default function RegisterModal(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')
    
    const handleSubmit = (e) => {
        e.preventDefault()
        
        register(email, password, confPassword)
        .then(res => {
            login(email, password)
            .then(res => {
                localStorage.setItem("jwt", res.data.message)
                props.onHide()
                window.location.reload(false);
            }).catch((e) => {
                console.log(e)
            })
        }).catch((e) => {
            console.log(e)
        })
    };

    const closeModal = () => {
        props.onHide();
    }

    return (
        <>
            <Modal
            {...props}
            >
                <Modal.Body className='modal-body'>
                <button onClick={closeModal} type="button" class="btn-close" aria-label="Close"></button>
                <Modal.Title className='modal-title'> Register </Modal.Title>
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
                        <input
                            type='password'
                            name="confirm-password"
                            placeholder="Confirm password"
                            value={confPassword}
                            onChange={(e) => setConfPassword(e.target.value)}
                            required/>
                    </div>
                        <div>
                            <Button className='btn-submit' type='submit' variant='light'> Create account </Button>
                        </div>
                    </Form>
                </Modal.Body>

            </Modal>
        </>
    )
}