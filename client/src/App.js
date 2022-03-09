import { Users,Home,Transactions,UserTransactions} from "./components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/clients" element={<Users />}></Route>
          <Route exact path="/transactions" element={<Transactions />}></Route>
          <Route exact path="/transactions/:id" element={<UserTransactions />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
