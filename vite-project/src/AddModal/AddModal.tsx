import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import classNames from 'classnames';
import CloseIcon from '@mui/icons-material/Close';
import { addUser } from '../store/userSlice';
import { useAppDispatch } from '../app/hooks';
import { useState } from 'react';
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
        const formData = new FormData();
        const file = selectedFile;
        if (file) {
            formData.append('image', file);
        }
        formData.append('user', JSON.stringify(data));
        const newUser = await fetch('http://localhost:3000/users/newUser', {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
                // 'Content-Type': 'application/json'
            },
            body: formData
        });
        const res = await newUser.json();
        dispatch(addUser({_id: res._id, name: {first: data.firstName, last: data.lastName}, email: data.email, location: {country: data.country, city: data.city}, image: data.image}))
        setModal(false);
    };

    const handleClose = () => {
        setModal(false);
    }
    
    // return (
    //     <>
    //         <div className='edit-modal-backdrop'/>
    //         <div className='edit-modal-container'>
    //             <CloseIcon className='close-icon' onClick={handleClose}/>
    //             <header>
    //                 <h2>
    //                     Add User
    //                 </h2>
    //             </header>
    //             <form className='edit-modal-form' onSubmit={handleSubmit(submitHandler)}>
    //                 <div className={classNames('edit-modal-name', 'error')}>
    //                     <input {...register("firstName", {required: 'Enter First Name'})} placeholder='First Name'/>
    //                     <input {...register("lastName", {required: 'Enter Last Name'})} placeholder='Last Name'/>
    //                 </div>
    //                 <input type="email" {...register("email", {required: 'Enter Email'})} placeholder='Email'/>
    //                 <div className='edit-modal-location'>
    //                     <input {...register("country", {required: 'Enter Country'})} placeholder='Country'/>
    //                     <input {...register("city", {required: 'Enter City'})} placeholder='City'/>
    //                 </div>
    //                 <input type='file' {...register("image")} />
    //                 {<span className={classNames("edit-modal-error-message", {'visible': error} )}>{error?.message}</span>}
    //                 <input className='edit-modal-submit' type="submit" value="Send"/>
    //             </form>
    //         </div>
    //     </>

    // )

        const [selectedFile, setSelectedFile] = useState(null);
    const handleFileChange = (event) => {
        console.log('entered');
        const file = event.target.files[0];
        setSelectedFile(file);
         event.target.value = null
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);

    };

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
                        {/* <input {...register("firstName", {required: 'Enter First Name'})} placeholder='First Name'/> */}
                        <TextField {...register("lastName", {required: 'Enter Last Name'})} label='Last Name'/>
                    </div>
                    <TextField className='edit-modal-form-email' type="email" {...register("email", {required: 'Enter Email'})} label='Email'/>
                    <div className='edit-modal-location'>
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
                    {/* <input id='file-upload' type='file' {...register("image")} /> */}
                    <input id='file-upload' type='file' onChange={handleFileChange} style={{display: 'none'}}/>

                    {/* <Input
                        type="file"
                        // onChange={handleFileChange}
                        inputProps={{ accept: 'image/*' }} // Optional: Limit accepted file types
                        id="file-upload"
                    /> */}
                    {<span className={classNames("edit-modal-error-message", {'visible': error} )}>{error?.message}</span>}
                    <input className='edit-modal-submit' type="submit" value="Send"/>
                </form>
            </div>
        </>

    )
}

export default AddModal;