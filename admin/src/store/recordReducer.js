import { GET_RECORDS } from "./actions";

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
        default:
            return state;
    }
}