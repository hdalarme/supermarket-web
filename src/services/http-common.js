import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3001/api/v1",
  headers: {
    "Content-type": "application/json"
    ,
    "X-User-Email": "hdalarme2@gmail.com",
    "X-User-Token": "XL9yxCLMibEeNQ4y5xUe"
    
  }
});