import axios from "axios";
const instance = axios.create({
  baseURL: "http://143.110.241.20:5001",
  // baseURL: "https://bhumipedia.land.gov.bd",
});
export default instance;