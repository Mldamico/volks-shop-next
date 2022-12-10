import axios from "axios";

const volksApi = axios.create({
  baseURL: "/api",
});

export default volksApi;
