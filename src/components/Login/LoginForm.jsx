import React from "react";
import { Field, reduxForm } from 'redux-form';
import styles from './Login.module.css';

const LoginForm = (props) => {
   return (
      <form onSubmit={props.handleSubmit} className={styles.loginForm}>
         <h3>Sign in</h3>
         <div className={styles.email}>
            <p>E-mail</p>
            <Field placeholder='e-mail' type="text" name='email' component='input' />
         </div>
         <div className={styles.password}>
            <p>Password</p>
            <Field placeholder='password' type="password" name='password' component='input' />
         </div>
         <div className={styles.rememberMe}>
            <Field type="checkbox" name='rememberMe' component='input' />Remember me
         </div>
         <div className={styles.button}>
            <button>Sign in</button>
         </div>
      </form>
   );
}

export default reduxForm({ form: 'login' })(LoginForm);