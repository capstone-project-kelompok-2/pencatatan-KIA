import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from './components/pages/register'
import Login from "./components/pages/login";
import Dashboard from "./components/pages/dashboard";
import './App.css'

function App() {
  return(
    <Router>
			<Routes>
        <Route>
					<Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login/>}></Route>
            <Route path="/" element={<Dashboard/>} />
        </Route>
			</Routes>
		</Router>
  )
}

export default App
