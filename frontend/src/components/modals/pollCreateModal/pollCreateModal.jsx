import {Modal, Form, Button} from 'react-bootstrap'
import '../modal.css'

export default function PollCreateModal(props) {

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
                    <Modal.Title id="modal-title">Create poll</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Label>Title</Form.Label>
                        <input
                            type='text'
                            name="Question"
                            placeholder="Type your question here"
                            onChange={handleChange}
                            required/>
                        <Form.Label>Answer Options</Form.Label>
                        <input
                            type='text'
                            name="option1"
                            placeholder="Option1"
                            onChange={handleChange}
                            required/>
                        <input
                            type='text'
                            name="option2"
                            placeholder="Option2"
                            onChange={handleChange}
                            required/>
                        <input
                            type='text'
                            name="option3"
                            placeholder="Option3"
                            onChange={handleChange}
                            required/>
                        <div>
                            <Button type='submit'> Create poll </Button>
                        </div>
                    </Form>
                </Modal.Body>

            </Modal>
        </>
    )
}