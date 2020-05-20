import React from 'react';
import Dashboard from "../../components/Dashboard/Dashboard";
import UserProfile from "../../components/Profile/UserProfile";


export const Profile = (props) => {
    return (
        <>
            <Dashboard mainComponent={UserProfile} profilePage={true} />
        </>
    );
}

export default Profile;