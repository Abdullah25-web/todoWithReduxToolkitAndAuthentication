// import "./App.css";
// import React from "react";
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Navigate,
// } from "react-router-dom";
// import ToDoLists from "./components/ToDoLists";
// import { useSelector } from "react-redux";
// import Signup from "./auth/Signup";
// import Login from "./auth/Login";
// import Logout from "./auth/Logout";
// import ProtectedRoutes from "./Routes/ProtectedRoutes";

// function App() {
//   const state = useSelector((state) => state.tasks.tasks);

//   console.log("State", state);

//   // Check if the user has a token in localStorage
//   const hasToken = localStorage.getItem("token");

//   return (
//     <Router>
//       <div>
//         <Routes>
//           <Route
//             path="/logout"
//             element={hasToken ? <Logout /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/login"
//             element={hasToken ? <Navigate to="/todos" /> : <Login />}
//           />
//           <Route
//             path="/signup"
//             element={hasToken ? <Navigate to="/todos" /> : <Signup />}
//           />
//           <Route
//             path="/todos"
//             element={hasToken ? <ToDoLists /> : <Navigate to="/login" />}
//           />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

import "./App.css";
import React from "react";
import Route from "./Routes";
import RouteConfig from "./RouteConfig"; // Import your route configuration here

function App() {
  return <Route />;
}

export default App;
