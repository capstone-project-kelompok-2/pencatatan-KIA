import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from './components/pages/register'
import Login from "./components/pages/login";
import Dashboard from "./components/pages/dashboard";
import Create from "./components/pages/create";
import Edit from "./components/pages/edit";
import Detail from "./components/pages/detail";
import ChartPage from "./components/pages/chart";
import PrimeReact from "./components/pages/primeReact";
import './App.css'
import 'primeicons/primeicons.css';
// sidebar
import Sidebar from "./components/molecules/Sidebar";
import {
  LifeBuoy,
  Receipt,
  Boxes,
  Package,
  UserCircle,
  BarChart3,
  LayoutDashboard,
  Settings
} from "lucide-react";

function App() {
  return(
    <main className="App">
        <Sidebar>
          <SidebarItem
            icon={<LayoutDashboard size={20} />}
            text="Dasboard"
            alert
          />
          <SidebarItem icon={<BarChart3 size={20} />} text="Statistics" active />
          <SidebarItem icon={<UserCircle size={20} />} text="Users" />
          <SidebarItem icon={<Boxes size={20} />} text="Inventory" />
          <SidebarItem icon={<Package size={20} />} text="Orders" alert />
          <SidebarItem icon={<Receipt size={20} />} text= "Billings" />
          <hr className="my-3" />
          <SidebarItem icon={<Settings size={20} />} text="Settings" />
          <SidebarItem icon={<LifeBuoy size={20} />} text="Help" />
        </Sidebar>
      
    


    <Router>
			<Routes>
        <Route>
					<Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/create" element={<Create/>} />
          <Route path="/edit/:id" element={<Edit/>} />
          <Route path="/detail/:id" element={<Detail/>} />
          <Route path="/test" element={<PrimeReact/>} />
          <Route path="/chart/:id" element={<ChartPage/>} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Route>
			</Routes>
		</Router>
    </main>
  );
}

export default App
