import { Button, Container } from 'react-bootstrap'
import './poll.css'
import { Form } from 'react-bootstrap'
import { useEffect, useState } from 'react';

import Vote from '../../services/poll.services/Vote.service';
import { erase } from '../../services/poll.services/deletepoll.service'
import { getUser } from '../../services/user.services/getuser.service'

export default function Poll({poll}) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [canVote, setVote] = useState(false)
    const [canDelete, setDelete] = useState(false)
    const [currentUser, setUser] = useState(null)
    const [token, setToken] = useState(localStorage.getItem('jwt'))

    const {_id, title, options, voters, owner, singleChoice} = poll

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

    const handleOptionsChange = (event) => {
        const optionIndex = parseInt(event.target.value, 10);
        const isSelected = selectedOptions.includes(optionIndex);
    
        if (isSelected) {
            setSelectedOptions(selectedOptions.filter((index) => index !== optionIndex));
        } else {
            setSelectedOptions([...selectedOptions, optionIndex]);
        }
    }
  
    const handleSubmit = (event) => {
        event.preventDefault();

        if (singleChoice) {
            Vote(_id, [selectedOption])
            .then(res => {
                window.location.reload(false);
            }).catch((e) => {
                console.log(e)
            })
        } else {
            Vote(_id, selectedOptions)
            .then(res => {
                window.location.reload(false);
            }).catch((e) => {
                console.log(e)
            })
        }
    };

    const deletePoll = (event) => {
        event.preventDefault();

        erase(_id)
        .then(res => {
            window.location.reload(false);
        }).catch((e) => {
            console.log(e)
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
                {singleChoice ? options.map((option, index) => (
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
                    )) 
                    :
                    options.map((option, index) => (
                        <div key={index} className='poll-option'>
                            <label key={index} className='poll-option' >
                            <input 
                                type='checkbox'
                                className='poll-radio'
                                value={index}
                                checked={selectedOptions.includes(index)}    
                                onChange={handleOptionsChange}            
                                /> {option['option']}
                            </label>
                            <div className='option-votes'>{option['votes']}</div>
                            </div>
                        )) 
                }
            </Form>
            <div className='buttons-container'>
                <Button className='poll-delete-button' disabled = {!canDelete} onClick={deletePoll}>Delete</Button>
                <Button className='poll-submit-button' disabled={!canVote || 
                            (selectedOption == null && selectedOptions.length == 0)} onClick={handleSubmit}>Vote</Button>
            </div>
        </div>
        </>
    )
}