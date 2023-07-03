import { useState } from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import classNames from 'classnames';
import CloseIcon from '@mui/icons-material/Close';
import { addUser } from '../store/userSlice';
import { useAppDispatch } from '../app/hooks';
// import './AddModal.scss';

interface Props {
    setModal: (att: boolean) => void;
}

type Inputs = {
    firstName: string;
    lastName: string;
    email: string;
    country: string;
    city: string;
    image: string;
}

const AddModal: React.FC<Props> = ({setModal}) => {
    const dispatch = useAppDispatch();
    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>({});
    const error = Object.values(errors)[0];
    const submitHandler = async data => {
        const newUser = await fetch('http://localhost:3000/users/newUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const res = await newUser.json();
        dispatch(addUser({_id: res._id, name: {first: data.firstName, last: data.lastName}, email: data.email, location: {country: data.country, city: data.city}}))
        setModal(false);
    };

    const handleClose = () => {
        setModal(false);
    }
    
    return (
        <>
            <div className='edit-modal-backdrop'/>
            <div className='edit-modal-container'>
                <CloseIcon className='close-icon' onClick={handleClose}/>
                <header>
                    <h1>
                        Add User
                    </h1>
                </header>
                <form className='edit-modal-form' onSubmit={handleSubmit(submitHandler)}>
                    <div className={classNames('edit-modal-name', 'error')}>
                        <TextField {...register("firstName", {required: 'Enter First Name'})} label="First Name" variant="outlined" />
                        <TextField {...register("lastName", {required: 'Enter Last Name'})} label='Last Name'/>
                    </div>
                    <TextField className='edit-modal-form-email' type="email" {...register("email", {required: 'Enter Email'})} label='Email'/>
                    <div className='edit-modal-location'>
                        <TextField {...register("country", {required: 'Enter Country'})} label='Country'/>
                        <TextField {...register("city", {required: 'Enter City'})} label='City'/>
                    </div>
                    {<span className={classNames("edit-modal-error-message", {'visible': error} )}>{error?.message}</span>}
                    <input className='edit-modal-submit' type="submit" value="Send"/>
                </form>
            </div>
        </>
    )
}

export default AddModal;