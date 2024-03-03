import { GET_ALL_SHOP_DATA } from "./actions";

const initialState = {
  shopList: {
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

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_SHOP_DATA:
      return {
        ...state,
        shopList: payload,
        loading: false,
      };
    default:
      return state;
  }
};
export default userReducer;
