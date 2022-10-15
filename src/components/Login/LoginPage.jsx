import React from "react";
import LoginForm from './LoginForm';
import styles from './Login.module.css';

const LoginPage = () => {
    const onSubmit = (formData) => {
        console.log(formData);
    }

    return (
        <div className={styles.formBlock}>
            <LoginForm onSubmit={onSubmit} />
        </div>
    );
}

export default LoginPage;