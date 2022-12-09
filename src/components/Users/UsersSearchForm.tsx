import React from 'react';
import { Field, Formik } from "formik";
import { FilterType } from '../../redux/users-reducer';
import styles from './UsersSearchForm.module.css';
import { useSelector } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';

// const usersSearchFormValidate = (values: FormType) => {
//     const errors = {}
//     return errors;
// }
type FriendType = 'true' | 'false' | 'null'
type FormType = {
    term: string,
    friend: FriendType
}
type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}
const UsersSearchForm: React.FC<PropsType> = React.memo(({ onFilterChanged }) => {
    const filter = useSelector((state: AppStateType) => state.usersPage.filter)

    const submit = (values: FormType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === 'null' ? null : (values.friend === 'true') ? true : false
        }
        onFilterChanged(filter);
        setSubmitting(false);
    }
    return (
        <Formik enableReinitialize={true}
            initialValues={{ term: filter.term, friend: String(filter.friend) as FriendType }}
            onSubmit={submit}>

            {({ handleSubmit, isSubmitting, }) => (
                <form onSubmit={handleSubmit} className={styles.searchFormRow}>
                    <Field type="text" name="term" className={styles.inputTerm} />
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