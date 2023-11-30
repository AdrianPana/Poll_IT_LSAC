import {Modal, Form, Button} from 'react-bootstrap'

export default function RegisterModal(props) {

    const handleChange = (event) => {
        console.log('AAAAA')
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        console.log('BBBB');
      };
    
    return (
        <>
            <Modal
            {...props}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="modal-title">Register</Modal.Title>
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
                        <input
                            type='password'
                            name="confirm-password"
                            placeholder="Confirm password"
                            onChange={handleChange}
                            required/>
                        <div>
                            <Button type='submit'> Create account </Button>
                        </div>
                    </Form>
                </Modal.Body>

            </Modal>
        </>
    )
}