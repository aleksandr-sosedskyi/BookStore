import React from "react";
import useStyles from "./styles";
import { Button } from '@material-ui/core';
import ProfileInfo from './ProfileInfo';
import { connect } from "react-redux";
import { editProfile } from "../../actions/profiles";


const UserProfile = (props) => {
    const classes = useStyles();
    const { profile } = props;

    return (
        <>
            <div className={`row ${classes.profileHeader}`}>
                <p className='col-4' style={{opacity:0.5}}><span>Редактировать профиль</span></p>
                <p className='col-4'><span>Сменить пароль</span></p>
                <p className='col-4'><span>История заказов</span></p>
            </div>
            <div className={classes.main}>
                {profile ? (
                    <ProfileInfo 
                    editProfile={props.editProfile} 
                    profile={profile} 
                    classes={classes}
                    />

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

export default connect(mapStateToProps, {editProfile})(UserProfile);