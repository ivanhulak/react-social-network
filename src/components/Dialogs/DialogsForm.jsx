import React from "react";
import {reduxForm, Field} from 'redux-form';

const DialogsForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field placeholder="Отправить сообщение" name='sentMessage' component='textarea'/>
            <div>
                <button>Send Message</button>
            </div>
        </form>
    );
}

export default reduxForm({form: 'dialogsForm'})(DialogsForm);