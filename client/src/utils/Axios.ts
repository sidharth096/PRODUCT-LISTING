import axios from "axios";
import { baseURL } from "../common/api";

const Axios = axios.create({
    baseURL: baseURL
})

export default Axios
