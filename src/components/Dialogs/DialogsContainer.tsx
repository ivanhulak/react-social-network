import Dialogs from './Dialogs';
import { sendMessage } from '../../redux/dialogs-reducer';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../HOC/withAuthRedirect';
import { compose } from 'redux';
import { AppStateType } from '../../redux/redux-store';
import { DialogsType, MessagesType } from '../../redux/dialogs-reducer';
import { getDialogs, getMessages } from '../../redux/selectors/dialogs-selectors';

type MapStateToPropsType = { dialogs: Array<DialogsType>, messages: Array<MessagesType> }
type MapDispatchToPropsType = { sendMessage: (message: string) => void }

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        dialogs: getDialogs(state),
        messages: getMessages(state),
    }
}

export default compose(withAuthRedirect, 
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, { sendMessage }))
(Dialogs);