import React, { Component, useState } from 'react';
import Header from './Header';
import './AddSubscriber.css';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

export default function AddSusbscriber (props) {
    const [addSubscriberForm, setAddSubscriberForm] = useState({
        id: 0,
        name: '',
        phone: ''
    });

    const history = useHistory(); 

    const inputChangedHandler = (e) => {
        const state = addSubscriberForm;
        state[e.target.name] = e.target.value;
        setAddSubscriberForm({
            id: state.id,
            name: state.name,
            phone: state.phone, 
        });
    }

    const onFormSubmitted = (e) => {
        e.preventDefault();
        props.addSubscriberHandler(addSubscriberForm);
        setAddSubscriberForm({ id: 0, name: '', phone: ' ' });
        history.push("/"); 
    }

    const { name, phone } = addSubscriberForm;

    return (
        <div>
            <Header heading="Add Subscriber" />
            <div className="component-body-container">
                <Link to="/">
                    <button className="custom-btn">Back</button>
                </Link>

                <ValidatorForm className="subscriber-form" onSubmit={onFormSubmitted}>

                    <TextValidator     
                        id="name"
                        label="Name: "
                        type="text" 
                        name="name"
                        value={name}
                        validators={['required']}
                        onChange = {inputChangedHandler}
                        errorMessages ={['Name cannot be empty']}
                    ></TextValidator>

                    <TextValidator
                        name="phone"
                        label="Phone: "
                        id="phone"
                        type="text" 
                        value={phone}
                        validators={['required']}
                        onChange = {inputChangedHandler}
                        errorMessages ={['Phone number cannot be empty']}
                    ></TextValidator>
                    

                    <div className="subscriber-info-container">
                        <span className="subscriber-to-add-heading">Subscriber to be added: </span><br />
                        <span className="subscriber-info">Name: {name}</span><br />
                        <span className="subscriber-info">Phone: {phone}</span><br />
                    </div>

                    <button type="submit" className="custom-btn add-btn">Add</button>
                </ValidatorForm>
            </div>
        </div>
    )
}

