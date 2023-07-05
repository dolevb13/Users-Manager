import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../UserCard/UserCardTypes';
import UserCard from '../UserCard/UserCard';
import { setUsers } from '../store/userSlice';
import './UsersPage.scss';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import AddCard from '../AddCard/AddCard';
import classNames from 'classnames';

const UserPage = () => {
    // const [users, setUsers] = useState<User[]>();
    const users = useAppSelector(state => state.user.users);
    const lightTheme = useAppSelector(state => state.theme.light);
    const dispatch = useAppDispatch();

    // const handleDeleteUser = (id: string) => {
    //     const filteredUsers = users?.filter(user => user.id !== id);
    //     dispatch(setUsers(filteredUsers));
    // }

    useEffect(() => {
        let isSubscribed = true;
        const fetchUsers = async () => {
            try {
                const data = await fetch('http://localhost:3000/users/usersList');
                const json = await data.json();
                if (isSubscribed) {
                    dispatch(setUsers(json));
                }
            } catch (e) {
                console.log(e);
            }
        }
        
        fetchUsers();
        return () => {
            isSubscribed = false;
        }
    }, [dispatch]);

    return (
        <div className={classNames('users-page-container', {dark: !lightTheme})}>
            {users?.map((user: User) => {
                return <UserCard key={user._id} _id={user._id} name={user.name} email={user.email} location={user.location} image={user.image}/>
            })}
            {users && <AddCard/>}
        </div>
    )

}

export default UserPage;