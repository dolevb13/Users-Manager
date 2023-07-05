import { useState } from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import { Name, Location } from '../UserCard/UserCardTypes';
import { updateUser } from '../store/userSlice';
import { useAppDispatch } from '../app/hooks';
import './EditModal.scss';

interface Props {
    setModal: (att: boolean) => void;
    id: string;
    name: Name;
    email: string;
    location: Location;
}

type Inputs = {
    firstName: string;
    lastName: string;
    email: string;
    country: string;
    city: string;
}

const EditModal: React.FC<Props> = ({setModal, id, name, email, location}) => {
    const dispatch = useAppDispatch();
    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>({
        defaultValues: {
            firstName: name.first,
            lastName: name.last,
            email,
            city: location.city,
            country: location.country
        }
    });
    const error = Object.values(errors)[0];
    const submitHandler = async (data: Inputs) => {
        const newUser = await fetch(`http://localhost:3000/users/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const res = await newUser.json();
        dispatch(updateUser(res));
        setModal(false);
    };

    const handleClose = () => {
        setModal(false);
    }

    return (
        <>
            <div className='modal-backdrop'/>
            <div className='modal-container'>
                <CloseIcon className='close-icon' onClick={handleClose}/>
                <header>
                    <h1>Edit User</h1>
                </header>
                <form className='modal-form' onSubmit={handleSubmit(submitHandler)}>
                    <div className={classNames('modal-form-name', 'error')}>
                        <TextField {...register("firstName", {required: 'Enter First Name'})} label="First Name" variant="outlined" />
                        <TextField {...register("lastName", {required: 'Enter Last Name'})} label='Last Name'/>
                    </div>
                    <TextField className='modal-form-email' type="email" {...register("email", {required: 'Enter Email'})} label='Email'/>
                    <div className='modal-form-location'>
                        <TextField {...register("country", {required: 'Enter Country'})} label='Country'/>
                        <TextField {...register("city", {required: 'Enter City'})} label='City'/>
                    </div>
                    {<span className={classNames("emodal-error-message", {'visible': error} )}>{error?.message}</span>}
                    <input className='modal-form-submit' type="submit" value="Send"/>
                </form>
            </div>
        </>

    )
}

export default EditModal;