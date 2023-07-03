import UserPage from '../UsersPage/UsersPage'
import Headline from '../Headline/Headline';
import classNames from 'classnames';
import { useAppSelector } from '../app/hooks';

const HomePage = () => {

    const theme = useAppSelector(state => state.theme.light);

    return (
        <div className={classNames('home-page-container', {'dark': !theme})}>
            <Headline menu/>
            <UserPage/>
        </div>
    )
};

export default HomePage;