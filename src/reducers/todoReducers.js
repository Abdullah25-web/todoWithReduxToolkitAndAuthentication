// const initialData = {
//   list: [],
// };

// const todoReducers = (state = initialData, action) => {
//   switch (action.type) {
//     case "ADD_TODO":
//       const { id, data } = action.payload;

//       return {
//         ...state,
//         list: [
//           ...state.list,
//           {
//             id: id,
//             data: data,
//           },
//         ],
//       };
//     case "DELETE_TODO":
//       const deletedId = action.payload;
//       const updatedListDelete = state.list.filter(
//         (todo) => todo.id !== deletedId
//       );
//       return {
//         ...state,
//         list: updatedListDelete,
//       };

//     case "UPDATE_TODO":
//       const updatedData = action.payload;

//       const updatedList = state.list.map((item) => {
//         if (item.id === updatedData.id) {
//           return {
//             ...item,
//             data: updatedData,
//           };
//         } else return item;
//       });

//       return {
//         ...state,
//         list: updatedList,
//       };

//     default:
//       return state;
//   }
// };

// export default todoReducers;
