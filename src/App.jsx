import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from './components/pages/register'
import Login from "./components/pages/login";
import Dashboard from "./components/pages/dashboard";
import Create from "./components/pages/create";
import Edit from "./components/pages/edit";
import Detail from "./components/pages/detail";
import ChartPage from "./components/pages/chart";
import MedicalDetail from "./components/pages/medicalDetail";
import Index from "./components/pages";
import './app.css'
import 'primeicons/primeicons.css';
// home
import HomePage from "./components/pages/home";

function App() {
  return(
    <Router>
			<Routes>
        <Route>
					<Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/create" element={<Create/>} />
          <Route path="/edit/:id" element={<Edit/>} />
          <Route path="/detail/:id" element={<Detail/>} />
          <Route path="/chart/:id" element={<ChartPage/>} />
          <Route path="*" element={<h1>Not Found</h1>} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/index" element={<Index/>} />
          <Route path="/medicalDetail/:id" element={<MedicalDetail/>} />
          <Route path="*" element={<h1>Halaman Tidak Ada</h1>} />
        </Route>
			</Routes>
		</Router>
  );
}

export default App
