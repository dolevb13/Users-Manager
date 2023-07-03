import { Link } from 'react-router-dom';
import Headline from '../../Headline/Headline';
import './ErrorPage.scss';

const ErrorPage = () => {
    
    return (
        <>
            <Headline menu={false}/>
            <main>
                <h1>An error occured</h1>
                <p>Could not find this page</p>
                <div className='error-page-home-link-container'>
                    <Link to='/'>Home</Link>
                </div>  
            </main>
            
        </>
    )
};

export default ErrorPage;