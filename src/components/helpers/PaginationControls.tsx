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
    <div className="flex justify-between align-middle ">
      <button
        className="bg-calm hover:opacity-90 text-white rounded-[10px] w-[179px] h-[48px] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed!"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || totalPages === 0}
      >
        <i className="fa-solid fa-arrow-left"></i>
        Prev
      </button>
      <p className="m-auto">
        <span className="underline">{currentPage}</span> of {totalPages}
      </p>
      <button
        className="bg-calm hover:opacity-90 text-white rounded-[10px] w-[179px] h-[48px] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed!"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || totalPages === 0}
      >
        Next <i className="fa-solid fa-arrow-right"></i>
      </button>
    </div>
  );
}
