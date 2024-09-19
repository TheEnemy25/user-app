import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Users from "./page/UserMain";
import EditUser from "./page/EditUser";
import UserMain from "./page/UserMain";
import AddUser from "./page/AddUser";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/users" element={<UserMain />} />
        <Route path="/edit-user" element={<EditUser />} />
        <Route path="/add-user" element={<AddUser />} />
      </Routes>
    </Router>
  );
}

export default App;
