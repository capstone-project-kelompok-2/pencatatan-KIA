import NavbarLogo from "../atom/Navbar/navbarLogo";
import SearchForm from "../atom/searchForm";
import Button from "../atom/button";
const Navbar = (value, handleSearch, handle, toggleGetDataModal) => {
    <div className="navbar grid grid-cols-2 bg-[#06b6d4] px-10 shadow-lg shadow-sky-900 z-50 mb-[20px]">
                    <NavbarLogo />
                    <div className="navbar__menu flex justify-end">
                        <Button label="New Data" handle={handle} className="text-primary border-2 border-blue-600 font-semibold bg-white   hover:bg-neutral-200  rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" icon="fa-solid fa-user-plus mr-3" />
                        <Button label="Get Data" className="text-primary border-2 border-blue-600 font-semibold bg-white   hover:bg-neutral-200  rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" icon="fa-solid fa-download mr-3" handle={toggleGetDataModal} />
                        <SearchForm value={value} handle={handleSearch} />
                    </div>
                </div>
}

export default Navbar;