import { Button, Container } from 'react-bootstrap'
import './poll.css'
import { Form } from 'react-bootstrap'
import { useEffect, useState } from 'react';

import { vote } from '../../services/poll.services/vote.service';
import { erase } from '../../services/poll.services/deletepoll.service'

export default function Poll({poll, currentUser}) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [canVote, setVote] = useState(false)
    const [canDelete, setDelete] = useState(false)

    const {_id, question, options, voters, owner} = poll

    useEffect(() => {
        setVote(!voters.includes(currentUser._id))
        setDelete(owner == currentUser._id)
    })

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };
  
    const handleSubmit = (event) => {
        event.preventDefault();
        
        vote(_id, selectedOption)
        .then(res => {
            console.log(res.data)
        })
    };

    const deletePoll = (event) => {
        event.preventDefault();

        erase(_id)
        .then(res => {
            console.log(res)
        })
    }

    return (
        <>
        <div className='poll-container'>
            <Form onSubmit={handleSubmit}>
                <label className='poll-question'> {question} </label>
                <div>
                    <label className='prompt-text'> Make a choice: </label>
                </div>
                {options.map((option, index) => (
                    <div key={index}>
                        <label key={index} className='poll-option' >
                        <input 
                            type='radio'
                            className='poll-radio'
                            value={index}
                            checked={selectedOption == index}    
                            onChange={handleOptionChange}            
                            /> {option['option']}
                            </label>
                        <span className='option-votes'>{option['votes']}</span>
                        </div>
                    ))}
                    <div className='poll-submit-button'>
                        <Button disabled={!canVote || selectedOption == null} variant="dark" type="submit">Vote</Button>
                    </div>
                    <div className='poll-delete-button'>
                        <Button disabled = {!canDelete} variant="danger" onClick={deletePoll}>Delete</Button>
                    </div>
            </Form>
        </div>
        </>
    )
}