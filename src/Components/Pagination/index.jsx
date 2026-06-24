import './index.scss';

const Pagination = ({
  currentPage,
  handleNext,
  handlePrev
}) => {
  return (
    <div className="pagination">

      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span>Page {currentPage}</span>
      <button
        onClick={handleNext}
      >
        Next
      </button>

    </div>
  );
}

export default Pagination;