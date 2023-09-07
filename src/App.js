import "./App.css";
import TodoTaskList from "./TodoTaskList/TodoTaskList";
import TodoTaskSubmission from "./TodoTaskSubmission/TodoTaskSubmission";

function App() {
  return (
    <div>
      <TodoTaskSubmission />
      <TodoTaskList />
    </div>
  );
}

export default App;
