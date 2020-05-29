import React, { useState, useRef } from "react";
import { Button, TextField } from "@material-ui/core";


const ProfileInfo = (props) => {
    const { classes, profile } = props;
    const successMessage = useRef(null);

    const getProfileInfo = () => {
        if (profile.profile) {
            var data = {}
            data.first_name = profile.profile.first_name;
            data.last_name = profile.profile.last_name;
            data.phone = profile.profile.phone;
            data.email = profile.profile.email;
            return data;
        }
        return {}
    }

    const [values, setValues] = useState(getProfileInfo());
    const [error, setError] = useState('');

    const handleFormChange = (event) => {
        let obj = Object.assign({}, values);
        obj[event.target.name] = event.target.value;
        setValues(obj);
    }

    const handleSuccess = () => {
        setError('');
        successMessage.current.style.display = "block";
        setTimeout(() => {
            successMessage.current.style.display = "none";
        }, 3000);
    }

    const handleErrors = (error) => {
        if(typeof(error) != 'string'){
            error = error[0]
        }
        setError(error);
    }
    
    const handleSubmitForm = () => {
        props.editProfile(
            values['first_name'],
            values['last_name'],
            values['phone'],
            values['email'],
            profile.profile.id,
            handleSuccess,
            handleErrors
        )
    }

    return (
        <>
            <div className={classes.profileInfoForm}>
                <form method="POST">
                    <TextField
                    className='mt-4'
                    label='Имя'
                    variant='outlined'
                    size='small'
                    fullWidth
                    name='first_name'
                    value={values.first_name}
                    onChange={handleFormChange}
                    />
                    <TextField
                    className='mt-4'
                    label='Фамилия'
                    variant='outlined'
                    size='small'
                    fullWidth
                    name='last_name'
                    value={values.last_name}
                    onChange={handleFormChange}
                    />
                    <TextField
                    className='mt-4'
                    label='Номер телефона'
                    variant='outlined'
                    size='small'
                    fullWidth
                    name='phone'
                    value={values.phone}
                    onChange={handleFormChange}
                    />
                    <TextField
                    className='mt-4'
                    label='E-mail'
                    variant='outlined'
                    size='small'
                    fullWidth
                    name='email'
                    value={values.email}
                    onChange={handleFormChange}
                    />
                    <Button
                    variant='contained'
                    color='primary'
                    type='button'
                    className={`mt-4 mx-auto d-block`}
                    onClick={handleSubmitForm}
                    >
                        Сохранить
                    </Button>
                    <p 
                    className={classes.errorMessage} 
                    style={error ? {} : {display: "none"}}>
                        {error}
                    </p>
                    <p ref={successMessage} className={classes.saveSuccess}>Сохранено!</p>
                </form>
            </div>
        </>
    )
}

export default ProfileInfo;