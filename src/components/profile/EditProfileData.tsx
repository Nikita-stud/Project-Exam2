export default function EditProfileData({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  return (
    <>
      <div className="flex flex-col gap-2 w-full md:col-start-1 md:row-start-1">
        <span className="font-semibold color-calm opacity-80">Username</span>
        <div
          aria-hidden="true"
          className="h-[58px] bg-input-disabled w-full border rounded-[10px] px-[20px] overflow-scroll flex items-center color-calm"
        >
          {name}
        </div>
      </div>

      <div className="flex flex-col gap-2 w-full md:col-start-2 md:row-start-1">
        <span className="font-semibold color-calm opacity-80">
          Email address
        </span>
        <div
          aria-hidden="true"
          className="h-[58px] bg-input-disabled w-full border rounded-[10px] px-[20px] overflow-scroll flex items-center color-calm"
        >
          {email}
        </div>
      </div>

      <div className="flex flex-col gap-2 w-full md:col-start-3 md:row-start-1">
        <span className="font-semibold color-calm opacity-80">Password</span>
        <div
          aria-hidden="true"
          className="h-[58px] bg-input-disabled w-full border rounded-[10px] px-[20px] overflow-scroll flex items-center color-calm"
        >
          ********
        </div>
      </div>
    </>
  );
}
