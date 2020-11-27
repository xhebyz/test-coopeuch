import React, {Component} from 'react';
import {connect} from 'react-redux';
import MaterialTable from "material-table";
import {Task} from '../task/Task';
import {showTasks, addTasks, editTask, deleteTask} from '../actions/tasksActions';
import {forwardRef} from 'react';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref}/>),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref}/>),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref}/>),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref}/>),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref}/>),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref}/>),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref}/>),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref}/>),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref}/>),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref}/>),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref}/>),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref}/>)
};

class TaskList extends Component {

    state = {
        open: false,
        isNew: false,
        selectedTask : {}
    };

    style = {
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }
    }

    handleOpenEdit = (task) => {
        this.setState({
            open: true,
            isNew: false,
            selectedTask:task
        });
    };


    handleOpenNew = () => {
        this.setState({
            open: true,
            isNew: true
        });
    };

    handleClose = () => {
        this.setState({
            open: false,
            isNew: false
        });
    };

    componentDidMount() {
        this.props.showTasks();
    }

    render() {
        const {tasks} = this.props;
        return (
            <div style={{maxWidth: "100%"}}>

                <Button variant="contained" onClick={this.handleOpenNew}>Añadir Tarea <AddIcon /></Button>

                <Modal
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    className={this.style.modal}
                >
                    <Task onClose={this.handleClose}  isNew={this.state.isNew} saveTask={this.props.addTasks} editTask={this.props.editTask} showTasks={this.props.showTasks} task={this.state.selectedTask}/>
                </Modal>

                <MaterialTable
                    actions={[
                        {
                            icon: 'edit',
                            tooltip: 'Editar Tarea',
                            onClick: (event, rowData) => {
                                console.log(rowData)
                                this.handleOpenEdit(rowData)
                                // Do save operation
                            }
                        },
                        {
                            icon: 'delete',
                            tooltip: 'Eliminar Tarea',
                            onClick: (event, rowData) => {
                                console.log(rowData)
                                // Do save operation
                            }
                        }

                    ]}
                    icons={tableIcons}
                    columns={[
                        {title: "Descripción", field: "description"},
                        {title: "Fecha de Creación", field: "dateCreation", type: "date"},
                        {title: "Vigente", field: "active", type: 'boolean'},
                    ]}
                    data={tasks}
                    title="Lista de Tareas"
                />
            </div>);
    }
}

const mapStateToProps = state => ({
    tasks: state.tasks.tasks
})

export default connect(mapStateToProps, {showTasks, addTasks, editTask, deleteTask})(TaskList);