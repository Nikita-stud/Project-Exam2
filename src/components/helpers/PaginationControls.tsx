export default function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  return (
    totalPages > 1 && (
      <div className="flex justify-between align-middle ">
        <button
          className="cta-pagination"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || totalPages === 0}
        >
          <i className="fa-solid fa-arrow-left" aria-hidden="true"></i>
          Prev
        </button>
        <p className="m-auto text-center shrink-0 whitespace-nowrap px-[10px]">
          <span className="font-bold">{currentPage}</span> of
          <span className="font-bold ml-[5px]">{totalPages}</span>
        </p>
        <button
          className="cta-pagination"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
        </button>
      </div>
    )
  );
}
