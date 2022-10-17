import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Textarea } from '../../../common/FormControls/FormControl';
import {required, maxLength} from '../../../utils/validator';

let maxLength250 = maxLength(250);

const MyPostsForm = (props) => {
   return (
      <form onSubmit={props.handleSubmit}>
         <Field placeholder='Create post' name='postText' 
                component={Textarea} validate={[required, maxLength250]}/>
         <div>
            <button>Add post</button>
         </div>
      </form>
   );
}

export default reduxForm({ form: 'myPostsForm' })(MyPostsForm);