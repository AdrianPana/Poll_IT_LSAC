import {Modal, Form, Button} from 'react-bootstrap'
import '../modal.css'

export default function LoginModal(props) {

    const handleChange = (event) => {
        console.log('AAAAA')
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        console.log('BBBB');
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
                            onChange={handleChange}
                            required/>
                        <input
                            type='password'
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
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