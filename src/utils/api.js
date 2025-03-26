import axios from "axios";
import backendPoint from "../config/backendPoint.js"
export const registerUser = async (user) => {
    try {
        const response = await axios.post(`${backendPoint}/auth/register`, user);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}

export const loginUser = async (user) => {
    try {
        const response = await axios.post(`${backendPoint}/auth/login`, user,{withCredentials:true});
        console.log("response in the api "+response);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}