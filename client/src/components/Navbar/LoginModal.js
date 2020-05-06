import React, { useState } from 'react';
import { connect } from "react-redux";
import { 
    Modal, 
    Card, 
    Button,
    TextField,
    Input,
    InputLabel,
    InputAdornment,
    FormControl
} from "@material-ui/core";

import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonAddIcon from "@material-ui/icons/PersonAdd"
import MailOutlineIcon from "@material-ui/icons/MailOutline"
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import PhoneIcon from '@material-ui/icons/Phone';
import { login, register } from "../../actions/auth";

const ModalLogin = (props) => {
    const {
        handleChangeSignType,
        classes,
        open,
        handleLoginModal,
        signType,
    } = props;

    const [signInValues, setSignInValues] = useState({
        'email': '',
        'password': '' 
    })

    const [signUpValues, setSignUpValues] = useState({
        'firsName': '',
        'lastName': '',
        'phone': '',
        'email': '',
        'password1': '',
        'password2': ''
    })

    const handleSignInChange = (event) => {
        let obj = Object.assign({}, signInValues);
        obj[event.target.name] = event.target.value
        setSignInValues(obj);
    }

    const handleSignUpChange = (event) => {
        let obj = Object.assign({}, signUpValues);
        obj[event.target.name] = event.target.value
        setSignUpValues(obj);
    }

    const submitSignIn = (e) => {
        e.preventDefault();
        props.login(
            signInValues['email'],
            signInValues['password']
        )
    }

    const submitSignUp = (e) => {
        e.preventDefault();
        props.register(
            signUpValues['firstName'],
            signUpValues['lastName'],
            signUpValues['phone'],
            signUpValues['email'],
            signUpValues['password'],
        )
    }

    return (
        <Modal
        onClose={() => handleLoginModal(false)}
        open={open}
        >
            <Card
            className={classes.loginModalCard}
            >
                <div style={{display: "flex"}}>
                    <button 
                    className={classes.signButtons}
                    style={signType == 'signIn' ? {backgroundColor:"#fafafa"} : {}}
                    onClick={() => handleChangeSignType('signIn')}
                    >
                        <ExitToAppIcon /> Вход
                    </button>
                    <button 
                    className={classes.signButtons}
                    style={signType == 'signUp' ? {backgroundColor:"#fafafa"} : {}}
                    onClick={() => handleChangeSignType('signUp')}
                    >
                        <PersonAddIcon /> Новый аккаунт
                    </button>
                </div>
                {signType == 'signIn' ? (
                    <form onSubmit={submitSignIn} className='pt-4 px-2 text-center'>
                        {props.auth.signInErrors && (
                            <p className={classes.errorMessage}>{props.auth.signInErrors}</p>
                        )}
                        <TextField
                            className={classes.loginModalTextInputs + " mt-3"}
                            id="login-email"
                            label="Email"
                            name='email'
                            type='email'
                            size='small'
                            onChange={handleSignInChange}
                            value={signInValues['email'] || ''}
                            variant='outlined'
                            InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <MailOutlineIcon className={classes.opacity} />
                                </InputAdornment>
                            ),
                            }}
                        />
                        <TextField
                            className={classes.loginModalTextInputs + " mt-4"}
                            id="login-password"
                            label="Пароль"
                            name='password'
                            type='password'
                            size='small'
                            onChange={handleSignInChange}
                            value={signInValues['password'] || ''}
                            variant='outlined'
                            InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <VpnKeyIcon className={classes.opacity} />
                                </InputAdornment>
                            ),
                            }}
                        />
                        <Button
                        className="mt-4"
                        color='primary'
                        variant='contained'
                        type="submit"
                        >
                            Войти
                        </Button>
                        <p className={classes.forgotPasswordText}>Забыли пароль?</p>
                    </form>
                ):
                (
                    <form onSubmit={submitSignUp} className='pt-4 pb-4 px-2 text-center'>
                        <TextField
                            className={classes.loginModalTextInputs + " mt-3"}
                            id="register-first-name"
                            label="Имя"
                            name='firstName'
                            size='small'
                            variant='outlined'
                            onChange={handleSignUpChange}
                            value={signUpValues['firstName'] || ''}
                            InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AssignmentIndIcon className={classes.opacity} />
                                </InputAdornment>
                            ),
                            }}
                        />
                        <TextField
                            className={classes.loginModalTextInputs + " mt-3"}
                            id="register-last-name"
                            label="Фамилия"
                            name="lastName"
                            size='small'
                            onChange={handleSignUpChange}
                            value={signUpValues['lastName'] || ''}
                            variant='outlined'
                            InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AssignmentIndIcon className={classes.opacity} />
                                </InputAdornment>
                            ),
                            }}
                        />
                        <TextField
                            className={classes.loginModalTextInputs + " mt-3"}
                            id="register-phone"
                            label="Телефон"
                            name='phone'
                            size='small'
                            onChange={handleSignUpChange}
                            value={signUpValues['phone'] || ''}
                            variant='outlined'
                            InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PhoneIcon className={classes.opacity} />
                                </InputAdornment>
                            ),
                            }}
                        />
                        <TextField
                            className={classes.loginModalTextInputs + " mt-3"}
                            id="register-email"
                            label="Email"
                            type='email'
                            name='email'
                            onChange={handleSignUpChange}
                            value={signUpValues['email'] || ''}
                            size='small'
                            variant='outlined'
                            InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <MailOutlineIcon className={classes.opacity} />
                                </InputAdornment>
                            ),
                            }}
                        />
                        <TextField
                            className={classes.loginModalTextInputs + " mt-4"}
                            id="register-password-1"
                            label="Пароль"
                            name='password'
                            type='password'
                            onChange={handleSignUpChange}
                            value={signUpValues['password'] || ''}
                            size='small'
                            variant='outlined'
                            InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <VpnKeyIcon className={classes.opacity} />
                                </InputAdornment>
                            ),
                            }}
                        />
                        <Button
                        className="mt-4"
                        color='primary'
                        variant='contained'
                        type="submit"
                        >
                            Зарегистрироваться
                        </Button>
                    </form>
                )}
            </Card>
        </Modal>
    );
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, {login, register})(ModalLogin);