import {ADD_TASK, DELETE_TASK, SHOW_TASK, SHOW_TASK_LIST, EDIT_TASK} from '../actions/type'

const initialState = {
    tasks: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SHOW_TASK_LIST:
            return {
                ...state,
                tasks: action.payload
            }
        case SHOW_TASK:
            return {
                ...state,
                task: action.payload
            }
        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload)
            }
        case ADD_TASK:
            return {
                ...state,
                task: [...state.tasks, action.payload]
            }
        case EDIT_TASK:
            return {
                ...state,
                tasks: state.tasks.map(task =>
                    task.id === action.payload ? (task = action.payload) : task
                )
            }
        default:
            return state;
    }
}