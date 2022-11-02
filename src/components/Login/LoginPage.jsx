import React from "react";
import LoginForm from './LoginForm';
import styles from './Login.module.css';
import { Navigate } from "react-router-dom";

const LoginPage = (props) => {
    const onSubmit = (formData) => {
        console.log(formData);
        const {email, password, rememberMe, captcha} = formData;
        props.login(email, password, rememberMe, captcha);
    }

    if (props.isAuth){
        return <Navigate to={`/profile/${props.userId}`}/>
    } return (
        <div className={styles.formBlock}>
            <LoginForm onSubmit={onSubmit} captchaURL={props.captchaURL}/>
        </div>
    )
}

export default LoginPage;