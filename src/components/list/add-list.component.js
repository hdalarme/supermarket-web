import React, {useState} from "react";
import ListDataService from "../../services/list.service";

const AddList = () => {
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
          <button className="btn btn-success" onClick={newList}>
            add
          </button>
        </div>
      ) : (
          <div className="form-group row">
            <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
            <div className="col-sm-8">
              <input 
                type="text"
                className="form-control"
                id="name"
                required
                value={list.name}
                onChange={handleInputCharge}
                name="name"
              />
            </div>
            <div className="col-sm-2">
            <button onClick={saveList} className="btn btn-success">
            Submit
          </button>
            </div>
          </div>
      )}
    </div>
  );
};

export default AddList;