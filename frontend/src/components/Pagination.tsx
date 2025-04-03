const Pagination = ({ currentPage, totalPages, pageSize, onPageChange, onPageSizeChange }: PaginationProps) => {
    return (
        <div className="flex flex-col items-center justify-center mt-4">
            {/* Pagination controls */}
            <div className="d-flex justify-content-center my-4">
                <button className="btn btn-secondary me-2" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>Previous</button>
                {[...Array(totalPages)].map((_, index) => (
                    <button 
                        key={index + 1} 
                        className={`btn ${index + 1 === currentPage ? 'btn-primary' : 'btn-outline-primary'} mx-1`} 
                        onClick={() => onPageChange(index + 1)}
                        disabled={currentPage === index + 1}
                    >
                        {index + 1}
                    </button>
                ))}
                <button className="btn btn-secondary ms-2" disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>Next</button>
            </div>
        
            <div className="text-center">
                <label>
                    Results per page:&nbsp;
                    <select value={pageSize} onChange={(p) => {
                        onPageSizeChange(Number(p.target.value));
                        onPageChange(1);
                    }}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>
                </label>
            </div>

            {/* #notcoveredinthevideos - Bootstrap Toast (hidden unless triggered) */}
            <div 
                className="toast align-items-center text-bg-info border-0 position-fixed bottom-0 end-0 m-3"
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
                id="sortToast"
                style={{ display: 'none' }}
            >
            </div>
        </div>
    );
};
export default Pagination;