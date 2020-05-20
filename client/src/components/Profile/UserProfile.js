import React from "react";
import useStyles from "./styles";
import { Button } from '@material-ui/core';
import ProfileInfo from './ProfileInfo';
import { connect } from "react-redux";


const UserProfile = (props) => {
    const classes = useStyles();
    const { profile } = props;

    return (
        <>
            <div className={`row ${classes.profileHeader}`}>
                <p className='col-4'><span>Редактировать профиль</span></p>
                <p className='col-4'><span>Сменить пароль</span></p>
                <p className='col-4'><span>История заказов</span></p>
            </div>
            <div className={classes.main}>
                {profile ? (
                    <ProfileInfo profile={profile} classes={classes}/>

                ) : (
                    <>
                    </>
                )}
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    profile: state.auth.profile
})

export default connect(mapStateToProps)(UserProfile);