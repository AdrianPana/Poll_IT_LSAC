import { Container } from 'react-bootstrap'
import {Row} from 'react-bootstrap'
import {Col} from 'react-bootstrap'
import './home.css'
import Poll from '../poll/poll'

export default function Home() {
    const options = ['aaa', "bbb", "ccc", "robert", "oho", "oooo"]

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
            <Row>
            <Col>
                <Poll question="Rares?" options={options} key='1'/>
            </Col>
            <Col>
                <Poll question="Codrut?" options={options} key='2'/>
            </Col>
            </Row>
            <Row>
            <Col>
                <Poll question="Rares?" options={options} key='1'/>
            </Col>
            <Col>
                <Poll question="Codrut?" options={options} key='2'/>
            </Col>
            </Row>
        </Container>
        </div>
        </>
    )
}