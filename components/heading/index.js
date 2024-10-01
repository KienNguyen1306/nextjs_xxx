function Heading({title}) {
    return ( <div className="flex items-center">
        <div className="bg-black text-white px-2 py-1 rounded uppercase">
          {title}
        </div>
        <div className="flex-grow border-t border-gray-700 ml-2" />
      </div> );
}

export default Heading;