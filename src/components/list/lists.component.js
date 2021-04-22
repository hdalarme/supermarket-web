import React, { useState, useEffect } from "react";

import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import ListUI from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';
import ListAltIcon from '@material-ui/icons/ListAlt';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import ListDataService from "../../services/list.service";

import AddList from "./add-list.component";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const List = () => {
  const classes = useStyles();
  const [lists, setLists] = useState([]);
  const [currentList, setCurrentList] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    retrieveLists();
  }, [lists]);

  const retrieveLists = () => {
    ListDataService.getAll()
    .then(response => {
      setLists(response.data);
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  };

  const refreshList = () => {
    retrieveLists();
    setCurrentList(null);
    setCurrentIndex(-1);
  };

  const setActiveList = (list, index) => {
    setCurrentList(list);
    setCurrentIndex(index);
  };

  const deleteList = () => {
    ListDataService.remove(currentList.id)
    .then(response => {
      console.log(response.data);
      refreshList();
    })
    .catch(e => {
      console.log(e)
    });
  };

  return(
    <Container component="main" maxWidth="xs">
    <div className="list row">
      <div className="col-md-12"> 
        <AddList />
      </div>
      <div className="col-md-12">
        <h4>Lists</h4>

        <ListUI component="nav" aria-label="secondary mailbox folders">
        {lists &&
            lists.map((list, index) => (
              <ListItem button 
              key={index}
              onClick={() => setActiveList(list, index)}
              selected = {(index === currentIndex ? true : false)}
              >
                <ListItemAvatar>
                  <Avatar>
                    <ListAltIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={list.name} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon 
                    onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) deleteList(e) } }
                    />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
        </ListUI>

        <ul className="list-group">
          {lists &&
            lists.map((list, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveList(list, index)}
                key={index}
              >
                {list.name}
              </li>
            ))}
        </ul>
      </div>

      <div className="col-md-6">
        {currentList ? (
          <div>
            <h4>List</h4>
            <div>
              <label>
                <strong>Name</strong>
              </label>{" "}
              {currentList.name}
            </div>
            <button className="badge badge-danger mr-2" onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) deleteList(e) } }>
              Delete
            </button>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a List...</p>
          </div>
        )}
      </div>
    </div>
    </Container>
  );

};

export default List