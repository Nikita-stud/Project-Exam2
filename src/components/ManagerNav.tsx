import Link from 'next/link';

export default function ManagerNav({
  searchValue,
  onSearchChange,
}: {
  searchValue: string;
  onSearchChange: (value: string) => void;
}) {
  return (
    <div className="fixed top-0 bg-white w-full shadow-page z-1002 md:hidden">
      <div className="p-[20px]">
        <div className="relative border rounded-[10px] h-[58px] bg-[#fff]">
          <p className="absolute top-[30%] left-[20px]">
            <i className="fa-solid fa-magnifying-glass" aria-hidden="true">
              <span className="hidden">hidden</span>
            </i>
          </p>
          <label
            htmlFor="venueSearch"
            className="block pl-[50px] pt-[5px] text-calm opacity-90"
          >
            Your Venues
          </label>
          <input
            type="text"
            id="venueSearch"
            name="venueSearch"
            placeholder="Search your venues..."
            className="w-full px-[50px] truncate"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="flex justify-between mt-[10px]">
          <button
            type="button"
            className="flex-1 flex items-center justify-center gap-2 bg-[#fff] max-w-[166px] h-[43px] border text-dark rounded-[10px] font-medium hover:opacity-90"
          >
            Unread
            <i className="fa-regular fa-message"></i>
          </button>
          <Link
            href="/profile/venues/create"
            className="flex-1 flex items-center justify-center gap-2 bg-primary border-black max-w-[166px] h-[43px] text-white rounded-[10px] font-medium hover:opacity-90"
          >
            New Venue
            <i className="fa-solid fa-plus" aria-hidden="true"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}
