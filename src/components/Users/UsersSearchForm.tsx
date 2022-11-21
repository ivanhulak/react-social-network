import React from 'react';
import { Field, Formik } from "formik";
import { FilterType } from '../../redux/users-reducer';
import styles from './UsersSearchForm.module.css';

const usersSearchFormValidate = (values: FormType) => {
    const errors = {}
    return errors;
}

type FormType = {
    term: string,
    friend: 'true' | 'false' | 'null'
}
type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}
const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {
    const submit = (values: FormType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === 'null' ? null : (values.friend === 'true') ? true : false
        }
        props.onFilterChanged(filter);
        setSubmitting(false);
    }
    return (
        <Formik initialValues={{ term: '', friend: 'null' }} onSubmit={submit} validate={usersSearchFormValidate}>
            {({ handleSubmit, isSubmitting, }) => (
                <form onSubmit={handleSubmit} className={styles.searchFormRow}>
                    <Field type="text" name="term" className={styles.inputTerm}/>
                    <Field as="select" name="friend" className={styles.selectField}>
                        <option value="null">All Users</option>
                        <option value="true">Only friends</option>
                        <option value="false">Only not friends</option>
                    </Field>
                    <button type="submit" disabled={isSubmitting} className={styles.searchBtn}>Search</button>
                </form>
            )}
        </Formik>
    );
})

export default UsersSearchForm;