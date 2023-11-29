// ambil children dari tableData
const TableData = ({ children, className, errors }) => {
    return (
        <td className={className}>
            {children}
            {errors}
        </td>
    );
}




export default TableData;