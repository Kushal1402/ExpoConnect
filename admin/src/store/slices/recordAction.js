import axios from "axios"
import { GET_RECORDS, GET_RECORDS_ERROR } from "../actions";

const PROXY = process.env.REACT_APP_URL;

export const getRecords = (page, limit, search) => async (dispatch) => {
    try {
        const res = await axios.get(PROXY + "admin/record/listing?page=" + page + "&limit=" + limit + "&search=" + search);
        dispatch({
            type: GET_RECORDS,
            payload: res.data.result
        });
        // console.log(res, "res of get records");
        return res.data.result;
    } catch (error) {
        // Handle the error here
        console.error("Error fetching records:", error);
        // Dispatch an action to update the loading state to false
        dispatch({
            type: GET_RECORDS_ERROR,
        });
    }
};

export const addRecord = (data) => async () => {
    return await axios.post(PROXY + `admin/record/add`, data);
}

export const updateRecord = (data, record_id) => async () => {
    return await axios.post(PROXY + `admin/record/edit-record/${record_id}`, data);
}

export const getCsvFile = (data) => async () => {
    const res = await axios.get(PROXY + `admin/record/csv?start_date=${data.start_date}&end_date=${data.end_date}`);
    return res;
}

export const deleteRecords = (data) => async () => {
    // console.log("🚀 ~ deleteRecords ~ data:", data)
    return await axios.post(PROXY + `admin/record/delete`, data);
}