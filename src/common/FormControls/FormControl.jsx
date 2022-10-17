import React from 'react';
import styles from './FormControl.module.css';

export const FormControl = ({input, meta: {touched, error}, children, ...props}) => {
   const hasError = touched && error;
   return (
      <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
         <div>
            {children}
         </div>
         {hasError && <span>{error}</span>}
      </div>
   );
}
export const Input = (props) => {
   const {input, meta, ...restProps} = props;
   return <FormControl {...props}> <input {...props.input} {...restProps} /> </FormControl>
}
export const Textarea = (props) => {
   const {input, meta, ...restProps} = props;
   return <FormControl {...props}> <textarea {...props.input} {...restProps}/> </FormControl>
}
