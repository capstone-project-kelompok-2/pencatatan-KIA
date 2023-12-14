const Card = ({ data, header, subtitle, icon }) => {
    return (
      <div className="w-full md:w-[150px] lg:w-[200px] xl:w-[200px]">
        <div className="bg-white rounded-lg shadow-xl p-4 hover:shadow-2xl transition-transform duration-300 transform hover:scale-105">
          <h2 className="text-xl font-bold mb-2">{header}</h2>
          <p className="text-gray-600 mb-4">{subtitle}</p>
          <div className="flex items-center justify-center font-bold">
            <i className={icon}></i>
            {Array.isArray(data) ? data.length : ''}
          </div>
        </div>
      </div>
    );
  }
  
  export default Card;
  