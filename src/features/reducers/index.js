import { combineReducers } from 'redux'
import TaskReducers from './TaskReducers'

export default combineReducers({
    tasks: TaskReducers
});