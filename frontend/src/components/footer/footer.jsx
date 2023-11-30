import { Container } from 'react-bootstrap'
import './footer.css'

export default function Footer() {
    return (
        <footer className='fixed-bottom'>
            <Container>
                <div className='footer-icons'>
                <a href="https://instagram.com/lsac.it?igshid=YTQwZjQ0NmI0OA==" target="_blank">
                <img 
                    src="src/assets/logo_instagram.png"
                    className="d-inline-block"
                    alt="Insta logo"
                    />
                </a>
                <a href="https://www.facebook.com/groups/757044007674036/?ref=share" target="_blank">
                <img 
                    src="src/assets/logo_facebook.png"
                    className="d-inline-block"
                    alt="Facebook logo"
                    />
                </a>
                <a href="https://www.youtube.com/watch?v=YaDL9PHYisY&pp=ygUEZWJhbA%3D%3D" target="_blank">
                <img 
                    src="src/assets/logo_twitch.png"
                    className="d-inline-block"
                    alt="Twitchlogo"
                    />
                </a>
                </div>
            </Container>
        </footer>
    )
}