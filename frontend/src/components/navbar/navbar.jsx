import './navbar.css'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import { Button } from 'react-bootstrap'
import { useState } from 'react'

import LoginModal from '../modals/loginModal/loginModal'
import RegisterModal from '../modals/registerModal/registerModal'
import PollCreateModal from '../modals/pollCreateModal/pollCreateModal'

import { logout } from '../../services/user.services/logout.service'

export default function MyNavbar() {

    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [showCreatePoll, setShowCreatePoll] = useState(false);

    const jwt = localStorage.getItem("jwt")

    return (
        <>
        <Navbar className="bg-body-tertiary fixed-top">
        <Container className='custom-container'>
            <div className="d-flex">
            <Navbar.Brand href="/">
                <img
                src="src/assets/logo.png"
                className="d-inline-block align-top"
                alt="PollIT logo"
                />
            </Navbar.Brand>
            </div>
            <div className="ml-auto">
                <Nav>
                    {!jwt ? 
                    (
                    <>
                        <div className='navbar-button'>
                        <Button variant="outline-dark" onClick={() => setShowLogin(true)}> Login </Button>
                        </div>
                        <div>
                            <Button variant="outline-dark" onClick={() => setShowRegister(true)}> Register </Button>
                        </div>
                    </>
                    ) : 
                    (
                    <>
                        <div className='navbar-button'>
                        <Button variant="outline-dark" onClick={() => setShowCreatePoll(true)}> Create poll </Button>
                        </div> 
                        <div>
                            <a href = '/'>
                            <Button variant="outline-dark" onClick={logout}> Logout </Button>
                            </a>
                        </div>
                    </>
                    )}
                </Nav>
            </div>
        </Container>
        </Navbar>
        <LoginModal show={showLogin} onHide={() => setShowLogin(false)}/>
        <RegisterModal show={showRegister} onHide={() => setShowRegister(false)}/>
        <PollCreateModal show={showCreatePoll} onHide={() => setShowCreatePoll(false)}/>
        </>
    )
}
