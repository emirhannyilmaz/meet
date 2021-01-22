import React from 'react';
import './Sidebar.css';
import Avatar from '@material-ui/core/Avatar';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from '../../firebase';
import { setUser } from '../../redux/actions';

function Sidebar() {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const handleLogoutButton = () => {
        auth.signOut().then(() => {
            dispatch(setUser(null));
        }).catch((error) => {
            alert(error.message);
        });
    }

    return (
        <div className="sidebar">
            <div className="sidebar__top">
                <Avatar src={user.photoURL} alt={user.displayName} />
                <h3>{user.displayName}</h3>
            </div>
            <div className="sidebar__buttons">
                <div className="sidebar__button current-tab">
                    <h3>Explore</h3>
                </div>
                <div className="sidebar__button" onClick={handleLogoutButton}>
                    <h3>Logout</h3>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;