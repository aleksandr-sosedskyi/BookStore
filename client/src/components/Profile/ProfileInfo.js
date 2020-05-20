import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";


const ProfileInfo = (props) => {
    const { classes, profile } = props;

    const getProfileInfo = () => {
        if (profile) {
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
                    />
                    <TextField
                    className='mt-4'
                    label='Фамилия'
                    variant='outlined'
                    size='small'
                    fullWidth
                    name='last_name'
                    value={values.last_name}
                    />
                    <TextField
                    className='mt-4'
                    label='Номер телефона'
                    variant='outlined'
                    size='small'
                    fullWidth
                    name='phone'
                    value={values.phone}
                    />
                    <TextField
                    className='mt-4'
                    label='E-mail'
                    variant='outlined'
                    size='small'
                    fullWidth
                    name='email'
                    value={values.email}
                    />
                    <Button
                    variant='contained'
                    color='primary'
                    type='submit'
                    className={`mt-4 mx-auto d-block`}
                    >
                        Сохранить
                    </Button>
                </form>
            </div>
        </>
    )
}

export default ProfileInfo;