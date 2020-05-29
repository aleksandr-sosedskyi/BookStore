import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { changePassword } from "../../actions/auth";
import { TextField, Button } from "@material-ui/core";

const ChangePassword = (props) => {
    const { classes, profile } = props;
    const [error, setError] = useState('');
    const successMessage = useRef(null)
    const passwordForm = useRef(null);

    const handleSuccess = () => {
        setError('');
        successMessage.current.style.display = "block";
        setTimeout(() => {
            successMessage.current.style.display = "none";
        }, 3000);
        passwordForm.current.reset();
    }

    const handleError = () => {
        setError('Неверный старый пароль!');
    }

    const handleSubmitForm = (event) => {
        event.preventDefault();
        var elements = event.target.elements;
        var old_password = elements.old_password.value;
        var new_password = elements.new_password.value;
        var new_password_2 = elements.new_password_2.value;
        if (new_password != new_password_2){
            setError('Пароли не совпадают!');
            return;
        }
        else if(new_password.length < 6){
            setError('Мин. длина пароля - 6 символов!');
        }
        props.changePassword(
            profile.profile.id,
            old_password,
            new_password,
            handleSuccess,
            handleError
        )
    }

    return (
        <>
        <div className={classes.passwordChangeForm}>
            <form method="POST" ref={passwordForm} onSubmit={handleSubmitForm}>
                <TextField
                label="Старый пароль"
                size="small"
                type="password"
                variant="outlined"
                name="old_password"
                className='mt-4'
                fullWidth
                />
                <TextField
                label="Новый пароль"
                type="password"
                size="small"
                variant="outlined"
                name="new_password"
                className='mt-4'
                fullWidth
                />
                <TextField
                label="Подтвердите пароль"
                type="password"
                size="small"
                variant="outlined"
                name="new_password_2"
                className='mt-4'
                fullWidth
                />
                <Button
                variant='contained'
                color='primary'
                type='submit'
                className={`mt-4 mx-auto d-block`}
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

const mapStateToProps = (state) => ({})

export default connect(mapStateToProps, { changePassword })(ChangePassword);