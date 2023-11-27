const Label = ({forHtml, name}) => {
    return (
        <label htmlFor={forHtml} className="block mb-2 text-sm font-medium text-gray-900">{name}</label>
    )
}

export default Label