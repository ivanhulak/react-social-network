import React from 'react';
import { reduxForm } from 'redux-form';
import { SimpleBtn } from '../../../common/Buttons/SimpleButton/SimpleBtn';
import { createField, Textarea } from '../../../common/FormControls/FormControl';
import { required, maxLength } from '../../../utils/validator';

let maxLength250 = maxLength(250);

const MyPostsForm = (props) => {
   return (
      <form onSubmit={props.handleSubmit}>
         {createField('Create post', 'postText', Textarea, "", [required, maxLength250])}
         <SimpleBtn btn_text='Add post' />
      </form>
   );
}

export default reduxForm({ form: 'myPostsForm' })(MyPostsForm);