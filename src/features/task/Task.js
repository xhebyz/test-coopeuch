import React from 'react';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

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


export function Task() {

    const [checked, setChecked] = React.useState(true);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    let isEdit = false
    const classes = useStyles();

    return (
        <Paper elevation={3}>
            <div className={classes.root}>
                <form className={classes.form}>
                    <div>
                        <h3>{isEdit ? 'Editar Tarea' : 'Nueva Tarea'}</h3>
                    </div>
                    <div>
                        <TextField id="standard-basic" label="Descripción"/>
                    </div>
                    <div>
                    </div>
                    <div>
                        <FormControlLabel
                            control={<Checkbox checked={checked}
                                               onChange={handleChange}
                                               name="checkedA"/>}
                            label="Vigente"
                        />
                    </div>

                    <Button variant="contained" color="primary">
                        Guardar
                    </Button>

                </form>
            </div>
        </Paper>
    );
}
