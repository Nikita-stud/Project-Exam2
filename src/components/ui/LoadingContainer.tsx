export function LoadingContainer() {
  return (
    <div className="px-[20px] my-[20px] animate-pulse" role="status">
      <div className="card rounded-[10px]  overflow-hidden p-[5px]">
        <div className="w-full h-[174px] rounded-[10px]  bg-calm opacity-50" />
        <div className="pt-[10px] flex flex-col gap-[10px]">
          <div className="h-[20px] w-[220px] rounded-[5px] bg-calm opacity-50" />
          <div className="h-[20px] w-full rounded-[5px] bg-calm opacity-50" />
          <div className="h-[20px] w-[140px] rounded-[5px] bg-calm opacity-50" />
          <div className="flex justify-between gap-[20px] mt-[10px]">
            <div className="h-[43px] w-full max-w-[166px] rounded-[10px] bg-calm opacity-50" />
            <div className="h-[43px] w-full max-w-[166px] rounded-[10px] bg-calm opacity-50" />
          </div>
        </div>
      </div>
    </div>
  );
}
