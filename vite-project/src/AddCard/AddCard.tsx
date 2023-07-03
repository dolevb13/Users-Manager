import { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import AddModal from '../AddModal/AddModal';
import { User } from '../UserCard/UserCardTypes';
import './AddCard.scss';
import { useAppSelector } from '../app/hooks';
import classNames from 'classnames';


const AddCard: React.FC<User> = () => {

    const [isModalShown, setIsModalShown] = useState(false);
    const lightTheme = useAppSelector(state => state.theme.light);

    return (
        <>
            {isModalShown && <AddModal setModal={setIsModalShown}/>}
            <div className={classNames('user-card-container', {'dark': !lightTheme})}>
                <Tooltip title='Add new User' arrow>
                    <AddIcon className='add-icon' onClick={() => setIsModalShown(true)}/>
                </Tooltip>
            </div>
        </>
    )
};

export default AddCard;