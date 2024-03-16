import axios from "axios";
import { Add_Record } from "../api";

// Add Record API
export const AddRecord = async (data) => {
    const res = await axios.post(Add_Record, data);
    // console.log("add form res", res); 

    return res;
};
