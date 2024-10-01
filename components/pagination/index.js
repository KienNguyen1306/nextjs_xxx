import ReactPaginate from "react-paginate";

function Paginations({ pageCount, handleNextPage }) {
  const handlePageClick = (event) => {
    handleNextPage(event.selected + 1);
  };
  return (
    <div className="flex ">
      {pageCount > 1 && (
        <ReactPaginate
          className="text-white	flex px-5 py-5 mx-auto reactPaginate flex-wrap	justify-center	"
          breakLabel="..."
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          renderOnZeroPageCount={null}
          activeClassName={"active"}
        />
      )}
    </div>
  );
}

export default Paginations;
