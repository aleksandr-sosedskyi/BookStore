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

const ModalLogin = (props) => {
    const {
        handleChangeSignType,
        classes,
        open,
        handleLoginModal,
        signType
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
                    <form className='pt-4 px-2 text-center'>
                        <TextField
                            className={classes.loginModalTextInputs + " mt-3"}
                            id="input-with-icon-textfield"
                            label="Email"
                            size='small'
                            variant='outlined'
                            InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <MailOutlineIcon />
                                </InputAdornment>
                            ),
                            }}
                        />
                        <TextField
                            className={classes.loginModalTextInputs + " mt-4"}
                            id="input-with-icon-textfield"
                            label="Password"
                            type='password'
                            size='small'
                            variant='outlined'
                            InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <VpnKeyIcon />
                                </InputAdornment>
                            ),
                            }}
                        />
                        <Button
                        className="mt-4"
                        color='primary'
                        variant='contained'
                        >
                            Войти
                        </Button>
                        <p className={classes.forgotPasswordText}>Забыли пароль?</p>
                    </form>
                ):
                (
                    <>
                    </>
                )}
            </Card>
        </Modal>
    );
}

export default ModalLogin;