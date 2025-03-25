import axios from "axios";
export const registerUser = async (user) => {
    try {
        const response = await axios.post("http://localhost:8082/auth/register", user);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}

export const loginUser = async (user) => {
    try {
        const response = await axios.post("http://localhost:8082/auth/login", user,{withCredentials:true});
        console.log("response in the api "+response);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}