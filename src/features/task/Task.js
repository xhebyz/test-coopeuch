import React from 'react';
import Paper from '@material-ui/core/Paper';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    form: {
        textAlign: 'left',
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },

}));


export function Task(props) {
    let isEdit = !props.isNew
    let activeDefault = true
    let descriptionDefault = ''
    let taskDefault = {}

    if (isEdit) {
        activeDefault = props.task.active
        descriptionDefault = props.task.description;
        taskDefault = props.task
    }

    const [edit_task, setTask] = React.useState(taskDefault);
    const [checked, setChecked] = React.useState(activeDefault);
    const [description, setDescription] = React.useState(descriptionDefault);
    const [open, setOpen] = React.useState(false);

    const saveTask = () => {

        if (!description) {
            setOpen(true);
            return
        }

        let task = {
            'description': description,
            'active': checked
        }
        props.saveTask(task).then(() => {
            props.showTasks();
            props.onClose()
        })
    }

    const editTask = () => {
        let task = {
            'id': edit_task.id,
            'description': description,
            'active': checked,
            'dateCreation': edit_task.dateCreation
        }
        props.editTask(task).then(() => {
            props.showTasks();
            props.onClose()
        })
    }


    const handleActive = (event) => {
        setChecked(event.target.checked);
    };


    const changeDescription = (event) => {
        setDescription(event.target.value);
    };
    const classes = useStyles();
    return (
        <Paper elevation={3} style={{margin: '15px'}}>
            <Collapse in={open}>
                <Alert severity="error"
                       action={
                           <IconButton
                               aria-label="close"
                               color="inherit"
                               size="small"
                               onClick={() => {
                                   setOpen(false);
                               }}
                           >
                               <CloseIcon fontSize="inherit"/>
                           </IconButton>
                       }
                >
                    Descripción no valida
                </Alert>
            </Collapse>

            <div style={{textAlign: 'right'}}>
                <IconButton aria-label="close">
                    <CloseIcon fontSize="small" onClick={props.onClose}/>
                </IconButton>
            </div>
            <div className={classes.root}>
                <form className={classes.form}>
                    <div>
                        <h3>{isEdit ? 'Editar Tarea' : 'Nueva Tarea'}</h3>
                    </div>
                    <div>
                        <TextField id="standard-basic" label="Descripción" onChange={changeDescription}
                                   value={description} multiline helperText={'Es necesario una descripción'}
                                   required
                        />
                    </div>
                    <div>
                    </div>
                    <div>
                        <FormControlLabel
                            control={<Checkbox checked={checked}
                                               onChange={handleActive}
                                               name="checkedA"/>}
                            label="Vigente"
                        />
                    </div>

                    <Button variant="contained" color="primary" onClick={isEdit ? editTask : saveTask}>
                        Guardar
                    </Button>

                </form>
            </div>
        </Paper>
    );
}
