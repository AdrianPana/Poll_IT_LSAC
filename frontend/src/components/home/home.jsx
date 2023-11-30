import { Container } from 'react-bootstrap'
import {Row} from 'react-bootstrap'
import {Col} from 'react-bootstrap'
import './home.css'
import Poll from '../poll/poll'

import { getPolls } from '../../services/poll.services/getpolls.service'
import { getUser } from '../../services/user.services/getuser.service'

import { useEffect, useState } from 'react'

export default function Home() {
    const [polls, setPolls] = useState([])
    const [user, setUser] = useState({})

    useEffect(() => {
        getUser()
        .then(res => {
            setUser(res.data)
        })
    }, [])

    useEffect(() => {
        getPolls()
        .then(res => {
            setPolls(res.data)
        })
    })
    return (
        <>
        <div>
        <Container className='custom-container'>
            <Row>
            <Col className='home-para'>
                Opiniile sunt mai importante ca niciodată. 
                Platformele de sondaje permit organizatorilor
                să culeagă feedback direct de la audiența lor 
                și să înțeleagă mai bine nevoile și dorințele acesteia.
            </Col>
            <Col className='turtle'>
                <img
                    src="src/assets/testoasa.png"
                    className=""
                    alt="Turteloi"
                    />
            </Col>
            </Row>
            {polls.map((poll, index) => (
                <Row key={index}>
                    <Col>
                        <Poll 
                        currentUser={user}
                        poll={poll} 
                        />
                    </Col>
                </Row>
            ))}
        </Container>
        </div>
        </>
    )
}