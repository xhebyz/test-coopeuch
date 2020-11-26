import axios from 'axios';
import {SHOW_TASK_LIST, EDIT_TASK, ADD_TASK, DELETE_TASK, SHOW_TASK} from './type';

export const showTasks = () => async dispatch => {
    const res = await axios.get('http://localhost:8080/tasks');

    console.log(res)

    dispatch({
        type: SHOW_TASK_LIST,
        payload: res.data
    })
}
export const showTask = id => async dispatch => {
    const res = await axios.get(`http://localhost:8080/tasks/${id}`);
    dispatch({
        type: SHOW_TASK,
        payload: res.data
    })
}

export const deleteTask = id => async dispatch => {
    await axios.delete(`http://localhost:8080/tasks/${id}`);
    dispatch({
        type: DELETE_TASK,
        payload: id
    })
}

export const addTasks = task => async dispatch => {
    const res = await axios.post('http://localhost:8080/tasks', task);
    dispatch({
        type: ADD_TASK,
        payload: res.data
    })
}

export const editTask = task => async dispatch => {
    const res = await axios.put(`http://localhost:8080/tasks/${task.id}`, task);
    dispatch({
        type: EDIT_TASK,
        payload: res
    })
}