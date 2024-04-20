import { GET_RECORDS, GET_RECORDS_ERROR } from "./actions";

const initialState = {
    records: {},
    loading: true
};

export default function recordReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_RECORDS:
            return {
                ...state,
                loading: false,
                records: payload
            };
        case GET_RECORDS_ERROR:
            return {
                ...state,
                loading: false,
                records: initialState.records
            }
        default:
            return state;
    }
}