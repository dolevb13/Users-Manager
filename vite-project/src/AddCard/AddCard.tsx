import { useState } from 'react';
import classNames from 'classnames';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import AddModal from '../AddModal/AddModal';
import { useAppSelector } from '../app/hooks';
import './AddCard.scss';

const AddCard: React.FC = () => {

    const [isModalShown, setIsModalShown] = useState(false);
    const lightTheme = useAppSelector(state => state.theme.light);

    return (
        <>
            {isModalShown && <AddModal setModal={setIsModalShown}/>}
            <div className={classNames('user-card-container', {'dark': !lightTheme})}>
                <Tooltip title='Add new user' arrow>
                    <AddIcon className='add-icon' onClick={() => setIsModalShown(true)}/>
                </Tooltip>
            </div>
        </>
    )
};

export default AddCard;