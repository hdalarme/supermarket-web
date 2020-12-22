import React, { useState, useEffect } from "react";
import ListDataService from "../../services/list.service";

import AddList from "./add-list.component";

const List = () => {
  const [lists, setLists] = useState([]);
  const [currentList, setCurrentList] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    retrieveLists();
  }, []);

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
    <div className="list row">
      <div className="col-md-10"> 
        <AddList />
      </div>
      <div className="col-md-6">
        <h4>Lists</h4>

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
  );

};

export default List