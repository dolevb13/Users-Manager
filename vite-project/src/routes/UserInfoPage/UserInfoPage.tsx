import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './UserInfoPage.scss';

const UserInfoPage = () => {
    const {userId} = useParams();
    const [user, setUser] = useState();

    useEffect(() => {
        const fetchUser = async () => {
            const data = await fetch(`http://localhost:3000/users/${userId}`);
            if (data.ok) {
                 const json = await data.json();
                 setUser(json);
            }
        };
        fetchUser();
    }, [userId]);

    return (
        <div className='user-info-page-container'>
            <div className='user-info-page-name'>{user?.name.first} {user?.name.last}</div>
            <div className='user-info-page-image'/>
        </div>
    )
};

export default UserInfoPage;