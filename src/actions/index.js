import post from "../requests/post";

export const fetchListFromServer = (keyword, page, total) => async dispatch => {
   dispatch({
      type: "SET_LIST",
      list: { total }
   });
   const list = await post("list", { keyword, page });
   dispatch({
      type: "SET_LIST",
      list: list
   });
};
