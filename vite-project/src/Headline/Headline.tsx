import MenuIcon from '@mui/icons-material/Menu';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Switch from '@mui/material/Switch';
import classNames from 'classnames';
import './Headline.scss';
import { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { changeTheme } from '../store/themeSlice';

interface Props {
    menu: boolean;
}

const Headline : React.FC<Props> = ({menu}) => {
    // const [isLightMode, setIsLightMode] = useState<boolean>(true);
    const lightTheme = useAppSelector(state => state.theme.light);
    const dispatch = useAppDispatch();
    const [isNavbarVisible, setIsNavbarVisible] = useState<boolean>(false);
    const toggle = () =>  {
        // setIsLightMode(prevState => !prevState);
        dispatch(changeTheme());
    }

    const handleClick = () => setIsNavbarVisible(prevState => !prevState);

    return (
        <>
            <div className={classNames('headline', {'dark': !lightTheme})}>
            <MenuIcon className={classNames('headline-menu-icon', {'hidden': !menu}, {'clicked': isNavbarVisible})} onClick={handleClick}/>
            <h1>Users Manager</h1>
            <div className='headline-theme-icon'>
                {lightTheme ? <LightModeIcon onClick={toggle}/> : <DarkModeIcon onClick={toggle}/>}
                {/* <Switch checked={isLightMode} onChange={toggle} /> */}
            </div>
        </div>
        {isNavbarVisible && <Navbar />}
        </>

    )
}

export default Headline;