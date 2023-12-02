const Button = ({ className,  handle, icon, label, onMouseLeave, onMouseEnter  }) => {
    return (
        <div className="flex justify-center items-center mt-3 mx-3">
            <button type="button" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={handle} className={className}><i className={icon}></i>{label}</button>
        </div>
    )
}

export default Button