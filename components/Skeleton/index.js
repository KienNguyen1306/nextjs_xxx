function Skeleton({ itemCount }) {
    return (
      <>
        {Array.from({ length: itemCount }, (_, index) => (
          <div className="card is-loading" key={index}>
            <div className="image h-28 sm:h-32" />
            <div className="content">
              <h2 />
            </div>
          </div>
        ))}
      </>
    );
  }
  
  export default Skeleton;
  