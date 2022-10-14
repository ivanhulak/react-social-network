import React from 'react';

class UserStatus extends React.Component{

   state = {
      editMode: false,
   }

   activateEditMode = () => {
      this.setState({
         editMode: true,
      })
   }
   deactivateEditMode = () => {
      this.setState({
         editMode: false,
      })
   }

   render(){
      return (
         <div>
            {!this.state.editMode &&
            <div>
               <span onDoubleClick={ this.activateEditMode }>Status</span>
            </div>
            }
            {this.state.editMode &&
            <div>
               <input autoFocus={true} type="text" onBlur={this.deactivateEditMode}/>
            </div>
            }
         </div>
      );
   }
}

export default UserStatus;