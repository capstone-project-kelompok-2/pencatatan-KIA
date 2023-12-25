const SearchForm = ({ value, handle }) => {
 return (
    <div className="search-bar">
    <form action="" className="flex">
        <div className="mr-0 mt-4 h-[30px] p-5 bg-blue-500 flex justify-center items-center rounded-l-lg">
            <i className="fa-solid fa-user" style={{ color: "#fff" }}></i>
        </div>
        <input
            type="text"
            value={value}
            onChange={handle}
            className="mt-4 ml-0 h-[30px] rounded-r-lg mx-3 p-5 active:border active:border-blue-700"
            placeholder="Cari Pasien"
        />
    </form>
</div>
 )
}
 export default SearchForm;