import React, {useState} from "react";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';

import ListDataService from "../../services/list.service";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1, 0, 2),
  },
}));

const AddList = () => {
  const classes = useStyles();
  const initialListState = {
    id: null,
    name: ""
  };

const [list, setList] = useState(initialListState);
const [submitted, setSubmitted] = useState(false);

const handleInputCharge = event => {
  const { name, value } = event.target;
  setList({ ...list, [name]: value });
};

const saveList = () => {
  var data = {
    name: list.name
  };

  ListDataService.create(data)
  .then(response => {
    setList({
      id: response.data.id,
      name: response.data.name
    });
    setSubmitted(true);
    console.log(response.data);
  })
  .catch(e => {
    console.log(e);
  });
};

const newList = () => {
  setList(initialListState);
  setSubmitted(false);
};

  return(
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <Button
                type="submit"
                fullWidth
                onClick={newList}
                variant="contained"
                className={classes.submit}
                endIcon={<Icon>send</Icon>}
              >Nova Lista</Button>
        </div>
      ) : (
          <div className="form-group row">
            <div className="col-sm-12">
              <TextField 
                required
                fullWidth
                id="name" 
                label="Lista" 
                variant="outlined" 
                size="small"
                value={list.name}
                onChange={handleInputCharge}
                name="name"
                margin="normal"
              />
            
              <Button
                type="submit"
                fullWidth
                onClick={saveList}
                variant="contained"
                color="primary"
                className={classes.submit}
                startIcon={<SaveIcon />}
              >Salvar</Button>
            </div>
          </div>
      )}
    </div>
  );
};

export default AddList;