import CloseIcon from '@mui/icons-material/Close';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import LaunchIcon from '@mui/icons-material/Launch';
import Tooltip from '@mui/material/Tooltip';
import { User } from './UserCardTypes';
import EditModal from '../EditModal/EditModal';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import './UserCard.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteUser } from '../store/userSlice';
import classNames from 'classnames';

interface Props extends User {
    handleDeleteUser: (arg: string) => void
}

const UserCard: React.FC<Props> = ({id, name, email, location, image}) => {

    const [imageData, setImageData] = useState('');
    const [isModalShown, setIsModalShown] = useState(false);
    const lightTheme = useAppSelector(state => state.theme.light);
    const dispatch = useAppDispatch();
    const {first = '', last = ''} = name;
    const {country = '', city = ''} = location;
    const fullName = `${first} ${last}`;
    const residence = `${city}, ${country}`;

    const fileToDataURL = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
        
            reader.onload = () => {
            resolve(reader.result);
            };
            
            reader.onerror = (error) => {
            reject(error);
            };
            
            reader.readAsDataURL(file);
        });
    }

    if (typeof image === 'object') {
        const file = image[0];
        fileToDataURL(file).then(dataURL => {
            const a = 1;
            setImageData(dataURL)
        })
    }


    const handleClose = () => {
        dispatch(deleteUser({id}));
    }

    const handleEdit = () => {
        setIsModalShown(true);
    }

    const sendEmail = () => {
        const subject = 'Hello';
        const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
        window.location.href = mailtoLink;
    }

    return (
        <>
            {isModalShown && <EditModal setModal={setIsModalShown} id={id} name={name} email={email} location={location}/>}
            <div className={classNames('user-card-container', {'dark': !lightTheme})}>
                <div className='user-card-icons'>
                    <div>
                        <Tooltip title="Edit" arrow>
                            <ModeEditIcon className='mode-edit-icon' onClick={handleEdit}/>
                        </Tooltip>
                        <Tooltip title='More Information' arrow>
                            <Link to={id}>
                                <LaunchIcon className='launch-icon' />
                            </Link>
                        </Tooltip>
                    </div>
                    <CloseIcon className='close-icon' onClick={handleClose}/>
                </div>
                <div className='user-card-full-name'>{fullName}</div>
                <div className='user-card-email' onClick={sendEmail}>{email}</div>
                <div>{residence}</div>
                <div className='user-card-image-container'>
                    <img src={imageData || image}/>
                </div>
            </div>
        </>
    )
}

export default UserCard;
