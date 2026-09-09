export default function SuccessMessage({
  message,
  redMessage,
  className = 'w-full max-w-125 mx-auto',
}: {
  message: string;
  redMessage?: string;
  className?: string;
}) {
  return (
    <div
      className={`p-[20px] bg-icons border rounded-[10px] flex flex-col gap-2 justify-center align-middle animate-pulse ${className}`}
    >
      <p role="status" className="text-black font-bold text-center text-xl">
        {message}
      </p>
      {redMessage && <p className="m-auto">{redMessage}</p>}
    </div>
  );
}
