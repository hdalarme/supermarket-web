import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3001/api/v1",
  headers: {
    "Content-type": "application/json",
    "X-User-Email": "helbertt@helbertt.xyz",
    "X-User-Token": "nLZxNeFsq83kTWs9g7H8"

  }
});