import { Container } from 'react-bootstrap'
import {Row} from 'react-bootstrap'
import {Col} from 'react-bootstrap'
import './home.css'
import Poll from '../poll/Poll'

import { getPolls } from '../../services/poll.services/getpolls.service'

import useMediaQuery from '../../useMediaQuery'

import { useEffect, useState } from 'react'

export default function Home() {
    const [polls, setPolls] = useState([])
    const [twoColPolls, setTwoColPolls] = useState([])

    const isDesktop = useMediaQuery('(min-width: 690px)')

    useEffect(() => {
            getPolls()
            .then((res) => {
                setPolls(res.data)
                setTwoColPolls(renderPolls(res.data))
            })
    }, [])

    const renderPolls = (polls) => {
        const newPolls = []
        for (let i = 0; i < polls.length; i += 2) {
            if (i + 1 < polls.length) {
                newPolls.push(
                <>
                <Col>
                    <Poll 
                    poll={polls[i]} 
                    />
                </Col>
                <Col>
                    <Poll 
                    poll={polls[i+1]} 
                    />
                </Col>
                </>)
            }
            else {
                newPolls.push(
                    <Col sm={6}>
                        <Poll 
                        poll={polls[i]} 
                        />
                    </Col>
            )
        } 
        }
        return newPolls
    }

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
            { !isDesktop ? 
                polls.map((poll, index) => (
                    <Row key={index}>
                        <Col>
                            <Poll 
                            poll={poll} 
                            />
                        </Col>
                    </Row>
                ))
             : 
                twoColPolls.map((poll, index) => (
                    <Row key={index}>
                        {poll}
                    </Row>
                ))
            }
            
        </Container>
        </div>
        </>
    )
}