import React, { useState } from "react";
import useStyles from "./styles";
import ProfileInfo from './ProfileInfo';
import ProfileOrders from './ProfileOrders';
import { connect } from "react-redux";
import { editProfile } from "../../actions/profiles";

const UserProfile = (props) => {
    const classes = useStyles();
    const { profile } = props;

    // Choices are 'account', 'password', 'orders'
    const [page, setPage] = useState('account');
    const handleChangePage = (page) => {
        setPage(page);
    }

    if (!profile) return <></>

    return (
        <>
            <div className={`row ${classes.profileHeader}`}>
                <p 
                className='col-4'
                style={page == 'account' ? {opacity: 0.5} : {}}
                >
                    <span onClick={() => handleChangePage('account')}>
                        Редактировать профиль
                    </span>
                </p>
                <p 
                className='col-4'
                style={page == 'password' ? {opacity: 0.5} : {}}
                >
                    <span onClick={() => handleChangePage('password')}>
                        Сменить пароль
                    </span>
                </p>
                <p 
                className='col-4'
                style={page == 'orders' ? {opacity: 0.5} : {}}
                >
                    <span onClick={() => handleChangePage('orders')}>
                        История заказов
                    </span>
                </p>
            </div>
            <div className={classes.main}>
                {page == 'account' ? (
                    <ProfileInfo 
                    editProfile={props.editProfile} 
                    profile={profile} 
                    classes={classes}
                    />

                ) : page == 'password' ? (
                    <>
                    </>
                ) : (
                    <ProfileOrders
                    profile={profile}
                    classes={classes}
                    />
                )}
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    profile: state.auth.profile
})

export default connect(mapStateToProps, {editProfile})(UserProfile);