import { GET_ALL_USERS } from "./actions";

const initialState = {
  userList: {
    docs: [],
    totalDocs: 0,
    limit: 10,
    page: 1,
    totalPages: 0,
    pagingCounter: 0,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: null,
    nextPage: null,
  },
  loading: true,
};

const subscriberReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_USERS:
      return {
        ...state,
        userList: payload,
        loading: false,
      };
    default:
      return state;
  }
};
export default subscriberReducer;
