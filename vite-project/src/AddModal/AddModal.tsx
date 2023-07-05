import { useState } from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import { addUser } from '../store/userSlice';
import { useAppDispatch } from '../app/hooks';

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
    const [selectedFile, setSelectedFile] = useState<File>();
    const dispatch = useAppDispatch();
    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>({});
    const error = Object.values(errors)[0];
    const submitHandler = async (data: Inputs) => {
        const formData = new FormData();
        if (selectedFile && data) {
            formData.append('image', selectedFile);
        }
        formData.append('data', JSON.stringify(data));
        const newUser = await fetch('http://localhost:3000/users/newUser', {
            method: 'POST',
            headers: {
                // 'Content-Type': 'application/json'
            },
            body: formData
        });
        const res = await newUser.json();
        dispatch(addUser({_id: res._id, name: {first: data.firstName, last: data.lastName}, email: data.email, location: {country: data.country, city: data.city}, image: res.image}));
        setModal(false);
    };

    const handleClose = () => {
        setModal(false);
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
        const file = e.target.files[0];
        setSelectedFile(file);
            e.target.value = '';    // Was null before
        }
    };

    const handleRemoveFile = () => {
        setSelectedFile(undefined);
    };
    
    return (
        <>
            <div className='modal-backdrop'/>
            <div className='modal-container'>
                <CloseIcon className='close-icon' onClick={handleClose}/>
                <header>
                    <h1>Add User</h1>
                </header>
                <form className='modal-form' onSubmit={handleSubmit(submitHandler)}>
                    <div className={classNames('modal-form-name', 'error')}>
                        <TextField {...register("firstName", {required: 'Enter First Name'})} label="First Name"/>
                        <TextField {...register("lastName", {required: 'Enter Last Name'})} label='Last Name'/>
                    </div>
                    <TextField className='modal-form-email' type="email" {...register("email", {required: 'Enter Email'})} label='Email'/>
                    <div className='modal-form-location'>
                        <TextField {...register("country", {required: 'Enter Country'})} label='Country'/>
                        <TextField {...register("city", {required: 'Enter City'})} label='City'/>
                    </div>
                    <div>
                        {selectedFile ? (
                            <div className='custom-file-presenter'>
                                <span>{selectedFile?.name}</span>
                                <button onClick={handleRemoveFile}>X</button>
                            </div>
                        ) : (
                            <label htmlFor="file-upload" className="custom-file-upload">
                                Click to select a file
                            </label>
                        )}
                    </div>
                    <input id='file-upload' type='file' accept=".jpg,.jpeg,.png" onChange={handleFileChange} style={{display: 'none'}}/>
                    {<span className={classNames("modal-error-message", {'visible': error} )}>{error?.message}</span>}
                    <input className='modal-form-submit' type="submit" value="Send"/>
                </form>
            </div>
        </>
    )
}

export default AddModal;