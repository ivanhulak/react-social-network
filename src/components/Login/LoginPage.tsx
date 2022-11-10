import React from "react";
import LoginForm from './LoginForm';
import styles from './Login.module.css';
import { Navigate } from "react-router-dom";

type PropsTypes = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string ) => void
    isAuth: boolean
    userId: number | null
    captchaURL: string | null
}

const LoginPage: React.FC<PropsTypes> = ({login, isAuth, userId, captchaURL}) => {
    const onSubmit = (formData: any) => {
        // console.log(formData);
        const {email, password, rememberMe, captcha} = formData;
        login(email, password, rememberMe, captcha);
    }

    if (isAuth){
        return <Navigate to={`/profile/${userId}`}/>
    } return (
        <div className={styles.formBlock}>
            <LoginForm onSubmit={onSubmit} captchaURL={captchaURL}/>
        </div>
    )
}

export default LoginPage;