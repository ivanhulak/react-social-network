import React from "react";
import { Field, reduxForm } from 'redux-form';
import styles from './Login.module.css';
import { required, maxLength, email } from '../../utils/validator';
import {Input} from '../../common/FormControls/FormControl';

let maxLength50 = maxLength(50);
let maxLength16 = maxLength(16);

const LoginForm = (props) => {
   console.log(props)
   const {handleSubmit, submitting, pristine, reset} = props;
   return (
      <form onSubmit={handleSubmit} className={styles.loginForm}>
         <div className={styles.title}>Sign in</div>
         <div className={styles.email}>
            <label for="email">E-mail</label>
            <Field placeholder='e-mail' type="text" name='email' 
                   component={Input} validate={[required, maxLength50, email]} />
         </div>
         <div className={styles.password}>
            <label for="password">Password</label>
            <Field placeholder='password' type="password" name='password' 
                   component={Input} validate={[required, maxLength16]}/>
         </div>
         <div className={styles.rememberMe}>
            <Field type="checkbox" name='rememberMe' component='input' />Remember me
         </div>
         <div className={styles.buttons}>
            <button className={styles.formBtn} type="submit" disabled={submitting}>Sign in</button>
            <button className={styles.formBtn} type="button" disabled={pristine || submitting} 
                    onClick={reset}>Clear</button>
         </div>
      </form>
   );
}

export default reduxForm({ form: 'login' })(LoginForm);