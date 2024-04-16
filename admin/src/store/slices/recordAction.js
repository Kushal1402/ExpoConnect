import axios from "axios"
import { GET_RECORDS } from "../actions";

const PROXY = process.env.REACT_APP_URL;

export const getRecords = (page, limit, search) => async (dispatch) => {
    const res = await axios.get(PROXY + "admin/record/listing?page=" + page + "&limit=" + limit + "&search=" + search);
    // console.log(res, "res of get records");
    dispatch({
        type: GET_RECORDS,
        payload: res.data.result
    })
    return res.data.result;
}

export const updateRecord = (data, record_id) => async () => {
    return await axios.post(PROXY + `admin/record/edit-record/${record_id}`, data);
}

export const getCsvFile = () => async () => {
    const res = await axios.get(PROXY + `admin/record/csv`);
    return res;
}