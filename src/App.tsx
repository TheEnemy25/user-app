import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import EditUser from "./page/EditUser";
import UserMain from "./page/main-page/UserMain";
import AddUser from "./page/AddUser";

function App() {
  return (
    <Router>
      <Header />
      <div className="mt-20 border-2 border-black w-4/5 m-auto">
        <Routes>
          <Route path="/users" element={<UserMain />} />
          <Route path="/edit-user" element={<EditUser />} />
          <Route path="/add-user" element={<AddUser />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
