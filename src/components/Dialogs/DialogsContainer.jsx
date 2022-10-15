import Dialogs from './Dialogs';
import { sendMessage } from '../../redux/dialogs-reducer';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../HOC/withAuthRedirect';
import { compose } from 'redux';


const mapStateToProps = (state) => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
    }
}

export default compose(withAuthRedirect,
    connect(mapStateToProps, { sendMessage }))(Dialogs);