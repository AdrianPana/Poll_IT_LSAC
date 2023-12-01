import { Button, Container } from 'react-bootstrap'
import './poll.css'
import { Form } from 'react-bootstrap'
import { useEffect, useState } from 'react';

import { vote } from '../../services/poll.services/vote.service';
import { erase } from '../../services/poll.services/deletepoll.service'
import { getUser } from '../../services/user.services/getuser.service'

export default function Poll({poll}) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [canVote, setVote] = useState(false)
    const [canDelete, setDelete] = useState(false)
    const [currentUser, setUser] = useState(null)
    const [token, setToken] = useState(localStorage.getItem('jwt'))

    const {_id, title, options, voters, owner} = poll

    useEffect(() => {
        if (currentUser === null) {
          setDelete(false);
          setVote(false);
          setToken(localStorage.getItem('jwt'));
          if (token) {
            getUser()
              .then((res) => {
                setUser(res.data);
              })
              .catch((error) => {
                console.error(error);
              });
          }
        } else {
          setVote(!voters.includes(currentUser._id));
          setDelete(owner == currentUser._id);
          setToken(token);
        }
      }, [currentUser, token, voters, owner]);
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };
  
    const handleSubmit = (event) => {
        event.preventDefault();
        
        vote(_id, selectedOption)
        .then(res => {
            window.location.reload(false);
        })
    };

    const deletePoll = (event) => {
        event.preventDefault();

        erase(_id)
        .then(res => {
            window.location.reload(false);
        })
    }

    return (
        <>
        <div className='poll-container'>
            <Form onSubmit={handleSubmit} className='form-container'>
                <label className='poll-question'> {title} </label>
                <div>
                    <label className='prompt-text'> Make a choice: </label>
                </div>
                {options.map((option, index) => (
                    <div key={index} className='poll-option'>
                        <label key={index} className='poll-option' >
                        <input 
                            type='radio'
                            className='poll-radio'
                            value={index}
                            checked={selectedOption == index}    
                            onChange={handleOptionChange}            
                            /> {option['option']}
                            </label>
                        <div className='option-votes'>{option['votes']}</div>
                        </div>
                    ))}
            </Form>
            <div className='buttons-container'>
                <Button className='poll-delete-button' disabled = {!canDelete} onClick={deletePoll}>Delete</Button>
                <Button className='poll-submit-button' disabled={!canVote || selectedOption == null} onClick={handleSubmit}>Vote</Button>
            </div>
        </div>
        </>
    )
}