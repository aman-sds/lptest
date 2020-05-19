const data = (state = [], action) => {
   switch (action.type) {
      case "SET_LIST":
         return { ...state, list: action.list };
      default:
         return state;
   }
};

export default data;
