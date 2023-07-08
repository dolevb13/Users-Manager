import { useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import backgroundImage from '../../images/Basketball-background.jpg';
import './LoginPage.scss';

type Inputs = {
    email: string;
    password: string;
}

const LoginPage: React.FC = () => {

    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>();
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
    };

    const handleSuccess = response => {
        const userObject = jwt_decode(response.credential)
        console.log(userObject);
    }

    // useEffect(() => {
    //     /* global google */
    //     google.account.id.initialize({
    //         client_id: "102786854300-79ratq64ac33pht9n1fotqqc0lu0n59f.apps.googleusercontent.com",
    //         callback: handleCallbackResponse
    //     });
    //     google.accounts.id.renderButton(
    //         document.getElementById("signInDiv"),
    //         {theme: 'outline', size: 'large'}
    //     )
    // }, []);

    return (
        <div className='login-page-container'>
            <div className='login-page-form'>
                <div className='login-page-form-content'>
                    <h1>PartnerNow</h1>
                    <GoogleLogin locale='en'  width='250' size='medium'
                        onSuccess={handleSuccess}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />
                    <div className='login-page-form-content-or'>- Or -</div>
                    <form className='login-page-maunal-form' onSubmit={handleSubmit(submitHandler)}>
                        <div className={classNames('login-page-maunal-form-name', 'error')}>
                            <TextField className='login-page-maunal-form-email' type="email" {...register("email", {required: 'Enter Email'})} label='Email' variant="standard"/>
                            <TextField {...register("password", {required: 'Enter Password'})} label="password" variant="standard"/>
                       </div>

                        {<span className={classNames("login-page-maunal-form-error-message", {'visible': error} )}>{error?.message}</span>}
                        <input className='login-page-maunal-form-submit' type="submit" value="Sign In"/>
                    </form>
                    <div className='sign-up'>Don't have an account? <span>Sign Up</span></div>
                </div>

                <div className='login-page-form-image-container'>
                    <img src={backgroundImage}></img>
                    <div className='login-page-form-image-container-content'>
                        <h1>Finding A Partner.<br/>Now Easier Than Ever.</h1>
                        {/* <h1></h1> */}
                        <div>Basketball, Soccer, Tennis and more.</div>
                        <div>Connect with people around you and find which team needs another person to join.</div>
                    </div>

                </div>                
            </div>
        </div>
    )
}

export default LoginPage;