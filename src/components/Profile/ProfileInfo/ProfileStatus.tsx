import React, { ChangeEvent } from 'react'; 

type StateType = { editMode: boolean, status: string }
type PropsType = { status: string, updateStatus: (newStatus: string) => void }

class ProfileStatus extends React.Component<PropsType, StateType> {
   state = {
      editMode: false,
      status: this.props.status
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
      this.props.updateStatus(this.state.status);
   }
   onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
      this.setState({
         status: e.currentTarget.value
      })
   }
   componentDidUpdate(prevProps: PropsType, prevState: StateType) {
      if(prevProps.status !== this.props.status){
         this.setState({
            status: this.props.status
         })
      }
   }
   render() {
      return (
         <div>
            {!this.state.editMode &&
               <div>
                  <span onDoubleClick={this.activateEditMode}>{this.props.status || 'Here, could be your status'}</span>
               </div>
            }
            {this.state.editMode &&
               <div>
                  <input autoFocus={true} type="text" onBlur={this.deactivateEditMode}
                     value={this.state.status} onChange={this.onStatusChange} />
               </div>
            }
         </div>
      );
   }
}

export default ProfileStatus;