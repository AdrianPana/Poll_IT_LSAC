import { Button, Container } from 'react-bootstrap'
import './poll.css'
import { Form } from 'react-bootstrap'
import { useState } from 'react';

export default function Poll({question, options}) {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log('Selected Option:', selectedOption);
    };
    return (
        <>
        <div className='poll-container'>
            <Form onSubmit={handleSubmit}>
                <label className='poll-question'> {question} </label>
                <div>
                    <label className='prompt-text'> Make a choice: </label>
                </div>
                {options.map((text, index) => (
                    <div key={index}>
                        <label key={index} className='poll-option' >
                        <input 
                            type='radio'
                            className='poll-radio'
                            value={index}
                            checked={selectedOption == index}    
                            onChange={handleOptionChange}            
                            /> {text}
                            </label>
                        </div>
                    ))}
                    <div className='poll-submit-button'>
                        <Button  disabled={selectedOption == null} variant="dark" type="submit">Vote</Button>
                    </div>
                    <div className='poll-delete-button'>
                        <Button variant="danger">Delete</Button>
                    </div>
            </Form>
        </div>
        </>
    )
}