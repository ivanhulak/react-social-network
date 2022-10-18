import React from "react";
import LoginForm from './LoginForm';
import styles from './Login.module.css';
import { Navigate } from "react-router-dom";

const LoginPage = (props) => {
    const onSubmit = (formData) => {
        console.log(formData);
        const {email, password, rememberMe} = formData;
        props.login(email, password, rememberMe);
    }

    if (props.isAuth){
        return <Navigate to={`/profile/${props.userId}`}/>
    } return (
        <div className={styles.formBlock}>
            <LoginForm onSubmit={onSubmit} />
        </div>
    )
}

export default LoginPage;